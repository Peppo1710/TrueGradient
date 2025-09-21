const express = require("express");
const router = express.Router();

// Import route modules
const authRoutes = require("./auth");

// Use route modules
router.use("/auth", authRoutes);

// API status route
router.get("/", (req, res) => {
  res.json({ 
    message: "TrueGradient API Routes", 
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth"
    }
  });
});

module.exports = router;
