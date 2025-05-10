import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema({
  animeId: { type: mongoose.Schema.Types.ObjectId, ref: "Anime", required: true },
  episode_number: { type: Number, required: true },
  episode_title: { type: String, required: true },
  video_src: { type: String, default: "https://anisyncweb.s3.eu-north-1.amazonaws.com/commingsoonvideo.mp4"},
  episode_pic_src: { type: String}
}, { timestamps: true });

episodeSchema.index({ animeId: 1 });

const Episode = mongoose.model("Episode", episodeSchema);
export default Episode;
