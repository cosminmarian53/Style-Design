const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const Order = require("../models/Order"); // For stats
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs"); // Not strictly needed here as Admin model method handles it

// POST /api/admin/login - Admin login
router.post("/login", async (req, res) => {
  console.log("\n--- Admin Login Attempt ---"); // Added newline for better log separation
  try {
    const { username, password } = req.body;
    // IMPORTANT: Never log plain text passwords in a production environment.
    if (!username || !password) {
      console.log(
        "Validation failed: Username or password missing from request body."
      );
      return res
        .status(400)
        .json({ message: "Please provide username and password" });
    }

    console.log(
      `Attempting to find admin with username: '${username}' in the database.`
    );
    // Ensure the query field 'username' matches your schema definition for Admin model
    const admin = await Admin.findOne({ username: username });

    if (!admin) {
      console.log(
        `Admin not found in database for username: '${username}'.`
      );
      console.log("--- End of Admin Login Attempt (User Not Found) ---");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // If admin is found
    console.log(
      `Admin found in database - Username: ${admin.username}, ID: ${admin._id}`
    );

    console.log("Attempting to match provided password with stored hash...");
    const isMatch = await admin.matchPassword(password); // 'password' is the plain text from req.body

    if (isMatch) {
      console.log("Password matched successfully!");
      const token = jwt.sign(
        { id: admin._id, username: admin.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h", // Token expires in 1 hour
        }
      );
      console.log("--- End of Admin Login Attempt (Success) ---");
      return res.json({
        // Added return here
        _id: admin._id,
        username: admin.username,
        token,
      });
    } else {
      console.log("Password did NOT match the stored hash.");
      console.log("--- End of Admin Login Attempt (Password Mismatch) ---");
      return res.status(401).json({ message: "Invalid username or password" }); // Added return
    }
  } catch (error) {
    console.error("!!! Admin login error (within catch block):", error);
    console.log("--- End of Admin Login Attempt (Server Error) ---");
    return res.status(500).json({ message: "Server error during admin login" }); // Added return
  }
});

// GET /api/admin/stats/coffee-types - Get coffee type statistics
// Add 'protect' middleware once JWT auth is fully set up
router.get("/stats/coffee-types", async (req, res) => {
  try {
    const coffeeTypeStats = await Order.aggregate([
      {
        $group: {
          _id: "$coffeeType", // Group by coffeeType
          count: { $sum: 1 }, // Count occurrences
        },
      },
      {
        $project: {
          // Rename _id to coffeeType for better readability
          _id: 0,
          coffeeType: "$_id",
          count: 1,
        },
      },
      {
        $sort: { count: -1 }, // Optional: sort by count descending
      },
    ]);
    res.json(coffeeTypeStats);
  } catch (error) {
    console.error("Error fetching coffee type stats:", error);
    res.status(500).json({ message: "Server error while fetching stats" });
  }
});

module.exports = router;
