// db.js
const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI ;

async function connectDB() {
    try {
        if (!MONGO_URI) {
          throw new Error("MONGO_URI is not defined in .env file");
        }
    
        await mongoose.connect(MONGO_URI);
     } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = {
  connectDB,
  User,
};
