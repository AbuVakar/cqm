// init.js
require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing
const Admin = require("./admin");

// Use environment variable for the database URI
const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/karam';

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Delete existing admin if exists
    await Admin.deleteOne({ username: 'admin@gmail.com' });

    // Create new admin with hashed password
    const plainPassword = '1234';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    const admin = new Admin({
      username: 'admin@gmail.com',
      password: hashedPassword,
    });

    await admin.save();
    console.log('Admin user created successfully');
  } catch (err) {
    console.error(`Error creating admin user: ${err}`);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Run the function to create the admin user
createAdmin();
