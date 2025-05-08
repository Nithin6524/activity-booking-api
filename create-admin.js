import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./src/models/userModel.js";
import dbConnect from "./src/config/dbConnect.js";

dotenv.config();

async function createAdmin() {
  try {
    await dbConnect();
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);
    
    // Create admin user
    const admin = new User({
      username: "admin",
      email: "admin@example.com",
      phone: "9999999999",
      password: hashedPassword,
      role: "admin"
    });
    
    await admin.save();
    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();
