import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import connectDB from "../config/db.js";

dotenv.config();

const getAllUsers = async () => {
  try {
    await connectDB();
    const users = await User.find();
    console.log("All Users:", users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

getAllUsers();
