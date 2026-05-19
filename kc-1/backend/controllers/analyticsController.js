const Order = require('../models/Order');
const Product = require('../models/Product');
const SupportTicket = require('../models/SupportTicket');

const currency = (value) => Number(value || 0);

exports.getAnalytics = async (req, res) => {
  try {
    const isWholesaler = req.user.role === 'wholesaler';
    const orderFilter = isWholesaler ? { wholesaler: req.user.id } : { kirana: req.user.id };
    const productFilter = isWholesaler ? { wholesaler: req.user.id } : {};

    const [orders, products, supportTickets] = await Promise.all([
      Order.find(orderFilter).populate('items.product', 'name category stock price').sort({ createdAt: -1 }),
      Product.find(productFilter).sort({ createdAt: -1 }),
      SupportTicket.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(5)
    ]);

    const totalRevenue = orders.reduce((sum, order) => sum + currency(order.totalAmount), 0);
    const pendingOrders = orders.filter((order) => order.status === 'pending').length;
    const shippedOrders = orders.filter((order) => order.status === 'shipped').length;
    const deliveredOrders = orders.filter((order) => order.status === 'delivered').length;
    const lowStockProducts = products.filter((product) => Number(product.stock) <= 10);

    const categoryMap = products.reduce((acc, product) => {
      const category = product.category || 'Other';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    res.json({
      role: req.user.role,
      stats: {
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders,
        shippedOrders,
        deliveredOrders,
        productCount: products.length,
        lowStockCount: lowStockProducts.length,
        supportTicketCount: supportTickets.length
      },
      recentOrders: orders.slice(0, 5),
      lowStockProducts: lowStockProducts.slice(0, 6),
      categories: Object.entries(categoryMap).map(([name, count]) => ({ name, count })),
      supportTickets
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};