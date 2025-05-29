require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const orderRoutes = require("./routes/orders");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// Basic root route
app.get("/", (req, res) => {
  res.send("Aztek Coffee Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
