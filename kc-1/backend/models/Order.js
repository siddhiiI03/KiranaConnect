// backend/models/Order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

  kirana: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  wholesaler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  items: [

    {

      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },

      quantity: {
        type: Number,
        required: true
      },

      price: {
        type: Number,
        required: true
      }

    }

  ],

  subtotal: {
    type: Number,
    required: true
  },

  gst: {
    type: Number,
    required: true
  },

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    default: 'pending'
  },

  dispatchedAt: {
    type: Date
  },

  deliveryETA: {
    type: Date
  }

}, {

  timestamps: true

});

module.exports = mongoose.model(
  'Order',
  orderSchema
);