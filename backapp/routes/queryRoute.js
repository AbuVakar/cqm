const express = require("express");
const mongoose = require("mongoose");
const Query = require("../models/query");
const queryRoute = express.Router();

// Admin routes for all queries
queryRoute.get("/ad/allpenquery", async (req, res) => {
  try {
    const q = await Query.find({ status: "pen" });
    return res.status(200).json({ msg: "Success", q });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

queryRoute.get("/ad/allproquery", async (req, res) => {
  try {
    const q = await Query.find({ status: "pro" });
    return res.status(200).json({ msg: "Success", q });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

queryRoute.get("/ad/allcomquery", async (req, res) => {
  try {
    const q = await Query.find({ status: "com" });
    return res.status(200).json({ msg: "Success", q });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

// User routes for their queries
queryRoute.get("/getpenquery/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }
    const result = await Query.find({ uid: id, status: "pen" });
    return res.status(200).json({ msg: "Success", result });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

queryRoute.get("/getproquery/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }
    const result = await Query.find({ uid: id, status: "pro" });
    return res.status(200).json({ msg: "Success", result });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

queryRoute.get("/getcomquery/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }
    const result = await Query.find({ uid: id, status: "com" });
    return res.status(200).json({ msg: "Success", result });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

// Add new query
queryRoute.post("/addquery", async (req, res) => {
  try {
    const { uid, department, subject, description } = req.body;

    // Validate required fields
    if (!uid || !department || !subject || !description) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const query = new Query({
      uid,
      department,
      subject,
      description,
      status: "pen" // Default status is pending
    });

    const result = await query.save();
    return res.status(201).json({ msg: "Success", result });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

// Update query status
queryRoute.patch("/status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid query ID" });
    }

    if (!["pen", "pro", "com"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    const result = await Query.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ msg: "Query not found" });
    }

    return res.status(200).json({ msg: "Success", result });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

// Delete query
queryRoute.delete("/deletePenQuery/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid query ID" });
    }

    const query = await Query.findById(id);
    if (!query) {
      return res.status(404).json({ msg: "Query not found" });
    }

    if (query.status !== "pen") {
      return res.status(403).json({ msg: "Only pending queries can be deleted" });
    }

    await Query.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Success" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = queryRoute;