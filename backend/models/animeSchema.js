import mongoose from "mongoose";

const animeSchema = new mongoose.Schema({
  animeid: { type: Number, required: true, unique: true },
  anime_name: { type: String, required: true, unique: true },
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
  characters: { type: [String], required: true },
}, { timestamps: true });

const Anime = mongoose.model("Anime", animeSchema);
export default Anime;
