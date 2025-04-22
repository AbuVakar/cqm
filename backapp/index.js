require('dotenv').config(); // Load .env file 

const express = require('express');
const app = express();
const port = process.env.PORT || 8000; // Use environment variable or default to 8000
const cors = require('cors');
const mongoose = require("mongoose");
const userRouter = require('./routes/userRoute');
const queryRoute = require('./routes/queryRoute');
const adminRoute = require('./routes/adminRoute');
const methodOverride = require('method-override');

// MongoDB connection using environment variable
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/karam";
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB Connection Successful "))
  .catch((error) => console.error("MongoDB Connection Error ", error));

// Middleware to ignore favicon requests
app.get('/favicon.ico', (req, res) => res.status(204));

// Middleware Setup
app.use(express.json());
app.use(cors());
app.use(adminRoute); 
app.use(queryRoute);
app.use(userRouter);
app.use(express.urlencoded({ extended: true })); // For form submissions
app.use(methodOverride('_method')); 

app.listen(port, () => console.log(`Server Started on port ${port}`));
