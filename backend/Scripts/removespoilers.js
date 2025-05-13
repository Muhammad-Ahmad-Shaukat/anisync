import Comment from "../models/comment.js";
import Anime from "../models/animeSchema.js";
import Episode from "../models/Episode.js";
import mongoose from "mongoose";
import axios from "axios";

let connected = false;
const connectIfNeeded = async () => {
  if (!connected) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connected = true;
    console.log("Connected to MongoDB for spoiler removal");
  }
};

const removeSpoilers = async () => {
  
};

export default removeSpoilers;
