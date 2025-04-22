const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user");
const userRoute = express.Router();

// 🟢 Create a new user (Registration)
userRoute.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Check for required fields
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "User already exists" });
    }

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const newUser = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({ msg: "User registered successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

// 🔵 Login route
userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check for required fields
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    // ✅ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // ✅ Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    return res.status(200).json({ msg: "Login successful", id: user._id });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

// 🟠 Get all users
userRoute.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

// 🟣 Get user by ID
userRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

// 🟡 Update user by ID
userRoute.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    // ✅ Check if user exists
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // ✅ If updating password, hash the new password
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // ✅ Update user
    user = await User.findByIdAndUpdate(id, req.body, { new: true }).select("-password");

    return res.status(200).json({ msg: "User updated successfully", user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

// 🔴 Delete user by ID
userRoute.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = userRoute;