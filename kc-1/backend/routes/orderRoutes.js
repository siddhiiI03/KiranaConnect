const router = require('express').Router();

const orderController = require('../controllers/orderController');

const authMiddleware = require('../middleware/authMiddleware');


// CREATE ORDER
router.post(
  '/',
  authMiddleware,
  orderController.createOrder
);


// GET MY ORDERS
router.get(
  '/my',
  authMiddleware,
  orderController.getMyOrders
);


// GET WHOLESALER ORDERS
router.get(
  '/',
  authMiddleware,
  orderController.getAllOrders
);


// UPDATE STATUS
router.put(
  '/:id/status',
  authMiddleware,
  orderController.updateOrderStatus
);


// DISPATCH
router.put(
  '/:id/dispatch',
  authMiddleware,
  orderController.dispatchOrder
);


module.exports = router;