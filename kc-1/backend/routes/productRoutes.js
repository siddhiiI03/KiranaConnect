// backend/routes/productRoutes.js

const router = require('express').Router();

const productController = require('../controllers/productController');

const authMiddleware = require('../middleware/authMiddleware');


// ================= GET ALL PRODUCTS =================
router.get(
  '/',
  productController.getProducts
);


// ================= CREATE PRODUCT =================
router.post(
  '/',
  authMiddleware,
  productController.createProduct
);


// ================= DELETE PRODUCT =================
router.delete(
  '/:id',
  authMiddleware,
  productController.deleteProduct
);


module.exports = router;