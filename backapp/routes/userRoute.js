const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const userRoute = express.Router();

// Create a new user (Registration)
userRoute.post("/", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Validate required fields
    if (!firstname || !email || !password) {
      return res.status(400).json({ msg: "First name, email and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword
    });

    return res.status(201).json({ msg: "Success", user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

// Login route
userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    return res.status(200).json({ msg: "Login Success", id: user._id });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

// Get all users
userRoute.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

// Get user by ID
userRoute.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

// Update user by ID
userRoute.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ msg: "Success", user: result });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

// Delete user by ID
userRoute.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ msg: "Success" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = userRoute;