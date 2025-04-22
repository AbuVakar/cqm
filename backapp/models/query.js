const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['pen', 'pro', 'com'], // pen: pending, pro: processing, com: completed
    default: 'pen',
  }
}, { timestamps: true });

const Query = mongoose.model("Query", querySchema);

module.exports = Query;