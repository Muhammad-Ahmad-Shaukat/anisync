import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema({
  animeId: { type: mongoose.Schema.Types.ObjectId, ref: "Anime", required: true },
  episode_number: { type: Number, required: true },
  video_src: { type: String },
  is_public: { type: Boolean, required: true },
  episode_pic_src: { type: String, required: true }
}, { timestamps: true });

episodeSchema.index({ animeId: 1 });

const Episode = mongoose.model("Episode", episodeSchema);
export default Episode;
