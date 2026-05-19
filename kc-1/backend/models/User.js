const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['kirana', 'wholesaler'],
    required: true
  },
  shopName: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  pincode: {
    type: String
  },
  settings: {
    theme: {
      type: String,
      enum: ['dark', 'midnight', 'sunrise'],
      default: 'midnight'
    },
    notifications: {
      orderUpdates: {
        type: Boolean,
        default: true
      },
      lowStockAlerts: {
        type: Boolean,
        default: true
      },
      marketing: {
        type: Boolean,
        default: false
      }
    },
    language: {
      type: String,
      default: 'English'
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);