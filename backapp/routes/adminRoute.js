const express = require("express");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const adminRoute = express.Router();

// Admin login route
adminRoute.post("/adlogin", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ msg: "Username and password are required" });
    }

    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    // Successful login
    return res.status(200).json({ msg: "Admin Login Success" });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = adminRoute;
