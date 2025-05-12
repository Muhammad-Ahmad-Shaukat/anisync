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
  await connectIfNeeded();
  const comments = await Comment.find({ deleted: false });

  for (const comment of comments) {
    const episode = await Episode.findById(comment.episodeId);
    if (!episode) continue;

    const anime = await Anime.findById(episode.animeId);
    if (!anime) continue;

    try {
      const response = await axios.post("http://127.0.0.1:8000/infer", {
  context: anime.description || "",
  review: comment.comment,
});


      if (response.data.label === "Spoiler") {
        comment.isSpoiler = true;
        await comment.save();
        console.log(`Deleted spoiler comment: ${comment._id}`);
      }
    } catch (error) {
      console.error(`Error during AI inference for comment ${comment._id}:`, error.message);
    }
  }
};

export default removeSpoilers;
