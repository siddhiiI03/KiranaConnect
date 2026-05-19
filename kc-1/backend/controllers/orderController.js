const Order = require('../models/Order');

const Product = require('../models/Product');


// ================= CREATE ORDER =================
exports.createOrder = async (req, res) => {

  try {

    const {
      items,
      subtotal,
      gst,
      totalAmount,
      wholesaler
    } = req.body;


    // ================= STOCK CHECK =================
    for (const item of items) {

      const product = await Product.findById(
        item.product
      );

      if (!product) {

        return res.status(404).json({
          message: 'Product not found'
        });

      }

      if (product.stock < item.quantity) {

        return res.status(400).json({
          message: `${product.name} stock insufficient`
        });

      }

    }


    // ================= REDUCE STOCK =================
    for (const item of items) {

      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            stock: -item.quantity
          }
        }
      );

    }


    // ================= CREATE ORDER =================
    const order = await Order.create({

      kirana: req.user.id,

      wholesaler,

      items,

      subtotal,

      gst,

      totalAmount

    });

    res.status(201).json(order);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};


// ================= GET MY ORDERS =================
exports.getMyOrders = async (req, res) => {

  try {

    console.log('Logged In Kirana ID:', req.user.id);

    const orders = await Order.find({

      kirana: req.user.id

    })

      .populate(
        'wholesaler',
        'name shopName'
      )

      .populate('items.product')

      .sort({
        createdAt: -1
      });

    console.log('My Orders:', orders);

    res.json(orders);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};


// ================= GET WHOLESALER ORDERS =================
exports.getAllOrders = async (req, res) => {

  try {

    console.log('Logged In Wholesaler ID:', req.user.id);

    // TEMPORARY DEBUG MODE
    // REMOVE THIS LATER
    const orders = await Order.find({})

      .populate(
        'kirana',
        'name shopName phone address'
      )

      .populate(
        'wholesaler',
        'name shopName'
      )

      .populate('items.product')

      .sort({
        createdAt: -1
      });

    console.log('Orders Found:', orders);

    res.json(orders);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};


// ================= UPDATE STATUS =================
exports.updateOrderStatus = async (req, res) => {

  try {

    const order = await Order.findByIdAndUpdate(

      req.params.id,

      {
        status: req.body.status
      },

      {
        new: true
      }

    );

    res.json(order);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};


// ================= DISPATCH ORDER =================
exports.dispatchOrder = async (req, res) => {

  try {

    const eta = new Date(
      Date.now() + 6 * 60 * 60 * 1000
    );

    const order = await Order.findByIdAndUpdate(

      req.params.id,

      {

        status: 'shipped',

        dispatchedAt: new Date(),

        deliveryETA: eta

      },

      {

        new: true

      }

    );

    res.json(order);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};