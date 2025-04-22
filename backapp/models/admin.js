const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,   // Admin username is required
    unique: true,     // Must be unique
    trim: true        // Removes extra spaces
  },
  password: {
    type: String,
    required: true,   // Password is required
    minlength: 6      // Minimum password length (example: 6 characters)
  }
}, {
  timestamps: true    // Automatically adds createdAt and updatedAt fields
});

const Admin = mongoose.model('admin', adSchema);

module.exports = Admin;