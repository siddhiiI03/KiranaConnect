const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getProfile,
  updateProfile,
  getSettings,
  updateSettings
} = require('../controllers/userController');

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.get('/settings', authMiddleware, getSettings);
router.put('/settings', authMiddleware, updateSettings);

module.exports = router;