const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['orders', 'payments', 'products', 'account', 'other'],
    default: 'other'
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['open', 'in_review', 'resolved'],
    default: 'open'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SupportTicket', supportTicketSchema);