const Product = require('../models/Product');
const sampleProducts = require('../data/sampleProducts');

const { redisClient } = require('../config/redis');

const syncSampleProducts = async () => {
  await Promise.all(
    sampleProducts.map(({ stock, ...product }) =>
      Product.updateOne(
        { name: product.name },
        {
          $set: product,
          $setOnInsert: { stock },
        },
        { upsert: true }
      )
    )
  );
};

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      description,
      price,
      stock,
      unit,
      minimumOrderQty,
    } = req.body;

    const product = await Product.create({
      name,
      brand,
      category,
      description,
      price,
      stock,
      unit,
      minimumOrderQty,
      wholesaler: req.user.id,
    });

    // Clear cache after creating new product
    await redisClient.del('all_products');

    res.status(201).json(product);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {

    // CHECK REDIS CACHE
    const cachedProducts = await redisClient.get('all_products');

    if (cachedProducts) {
      console.log('Serving products from Redis Cache 🚀');

      return res.json(JSON.parse(cachedProducts));
    }

    await syncSampleProducts();

    // FETCH FROM DATABASE
    const products = await Product.find()
      .populate('wholesaler', 'name email shopName')
      .sort({ category: 1, name: 1 });

    // STORE IN REDIS CACHE
    await redisClient.set(
      'all_products',
      JSON.stringify(products),
      {
        EX: 3600, // 1 hour expiry
      }
    );

    console.log('Products cached in Redis ✅');

    res.json(products);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    if (
      product.wholesaler &&
      product.wholesaler.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: 'You can delete only your own products',
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    // CLEAR CACHE AFTER DELETE
    await redisClient.del('all_products');

    res.json({
      message: 'Product deleted successfully',
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};