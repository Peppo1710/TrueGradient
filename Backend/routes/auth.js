const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User } = require("../db");


// JWT Secret (use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ 
        error: "Details are required" 
      });
    }
    
    
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        console.log(existingUser.username);
        
      return res.status(400).json({ 
        error: "User with this username already exists" 
      });
    }


    // Create new user
    const newUser = new User({
      username,
      password
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username
      }
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Signin route
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ 
        error: "Username and password are required" 
      });
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ 
        error: "Invalid username or password" 
      });
    }

    // Check password (simple comparison since no hashing)
    if (user.password !== password) {
      return res.status(401).json({ 
        error: "Invalid username or password" 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Signin successful",
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });

  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user profile (protected route) - Can be done directly with the help of localstorage , its not a full stack application
// router.get("/profile", (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
    
//     if (!token) {
//       return res.status(401).json({ error: "No token provided" });
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     const user = User.find(user => user.id === decoded.userId);
    
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json({
//       user: {
//         id: user.id,
//         username: user.username,
//         createdAt: user.createdAt
//       }
//     });

//   } catch (error) {
//     console.error("Profile error:", error);
//     res.status(401).json({ error: "Invalid token" });
//   }
// });

module.exports = router;
