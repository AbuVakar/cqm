const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,   // Ensures the first name is provided
    trim: true,       // Removes extra spaces
  },
  lastname: {
    type: String,
    trim: true,       // Optional field, trimmed for consistency
  },
  email: {
    type: String,
    required: true,   // Email is required
    unique: true,     // Ensures uniqueness of the email address
    trim: true,       // Removes extra spaces
  },
  password: {
    type: String,
    required: true,   // Password should be required (consider hashing it in practice)
  },
}, { timestamps: true });  // Adds createdAt and updatedAt fields automatically

const User = mongoose.model("User", userSchema);

module.exports = User;
