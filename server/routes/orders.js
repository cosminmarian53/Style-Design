const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Middleware to protect routes (example, will be more robust later)
const protect = (req, res, next) => {
  // For now, we'll assume if a route needs protection, we'll implement it fully later
  // This is a placeholder for JWT verification
  console.log("Protect middleware (placeholder)");
  next();
};

// POST /api/orders - Create a new order
router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      location,
      email,
      coffeeType,
      roast,
      additionalNotes,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !location ||
      !email ||
      !coffeeType ||
      !roast
    ) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields" });
    }

    const newOrder = new Order({
      firstName,
      lastName,
      location,
      email,
      coffeeType,
      roast,
      additionalNotes,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error while creating order" });
  }
});

// GET /api/orders - Get all orders (for admin)
// Add 'protect' middleware once JWT auth is fully set up for admin routes
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 }); // Sort by most recent
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
});

// PUT /api/orders/:id - Update an order (e.g., mark as fulfilled)
// Add 'protect' middleware
router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Toggle fulfillment status or set based on request body
    order.isFulfilled =
      req.body.isFulfilled !== undefined
        ? req.body.isFulfilled
        : !order.isFulfilled;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    if (error.kind === "ObjectId") {
      return res
        .status(404)
        .json({ message: "Order not found, invalid ID format" });
    }
    res.status(500).json({ message: "Server error while updating order" });
  }
});

module.exports = router;
