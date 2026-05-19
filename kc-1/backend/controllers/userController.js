const User = require('../models/User');

const allowedProfileFields = [
  'name',
  'phone',
  'shopName',
  'address',
  'city',
  'state',
  'pincode'
];

const pick = (source, fields) => fields.reduce((acc, field) => {
  if (source[field] !== undefined) acc[field] = source[field];
  return acc;
}, {});

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      pick(req.body, allowedProfileFields),
      { new: true, runValidators: true }
    ).select('-password');

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('settings');
    res.json(user?.settings || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const { theme, language, notifications = {} } = req.body;

    const update = {};
    if (theme !== undefined) update['settings.theme'] = theme;
    if (language !== undefined) update['settings.language'] = language;
    if (notifications.orderUpdates !== undefined) update['settings.notifications.orderUpdates'] = notifications.orderUpdates;
    if (notifications.lowStockAlerts !== undefined) update['settings.notifications.lowStockAlerts'] = notifications.lowStockAlerts;
    if (notifications.marketing !== undefined) update['settings.notifications.marketing'] = notifications.marketing;

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { $set: update },
      { new: true, runValidators: true }
    ).select('settings');

    res.json(updated.settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};