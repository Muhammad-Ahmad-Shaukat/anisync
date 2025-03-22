import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js";
import connectDB from "../config/db.js";

// Fix file path issues
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Define Anime Schema
const animeSchema = new mongoose.Schema(
  {
    animeid: { type: Number, required: true, unique: true },
    animename: { type: String, required: true, unique: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true },
    episodes: { type: Number, required: true },
    popularity: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String },
    trailer: { type: String, required: true },
    status: { type: String, required: true },
    season: { type: String, required: true },
    source: { type: String, required: true },
    character: { type: [String], required: true }, // Changed to an array
  },
  { timestamps: true }
);

const Anime = mongoose.model("Anime", animeSchema);

// Function to fetch all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    console.log("All Users:", users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
};

const start = async () => {
  try {
    await connectDB(); // Ensure DB connection is established

    // Add Anime Data
    const newAnime = new Anime({
      animeid: 1,
      animename: "One Piece",
      genre: "Action, Adventure, Fantasy",
      rating: 9.2,
      episodes: 1000,
      popularity: 10,
      image: "https://example.com/onepiece.jpg",
      description: "A story about Monkey D. Luffy's journey to become the Pirate King.",
      trailer: "https://www.youtube.com/watch?v=some_trailer_link",
      status: "Ongoing",
      season: "Fall 1999",
      source: "Manga",
      character: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Sanji", "Usopp"], // Now stored as an array
    });

    await newAnime.save();
    console.log("Anime added successfully!");

    // Fetch all users
    await getAllUsers();
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

start();
