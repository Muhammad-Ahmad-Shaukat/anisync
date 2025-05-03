import mongoose from "mongoose";

const animeSchema = new mongoose.Schema({
  animeid: { type: Number, required: true, unique: true },
  anime_name: { type: String, required: true, unique: true },
  genres: { type: [String], required: true },
  rating: { type: Number, required: true },
  episodes: { type: Number, required: true },
  popularity: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String },
  trailer: { type: String },
  status: { type: String, required: true },
  season: { type: String },
  source: { type: String },
  characters: { type: [String] },
  categories: { type: [String], default: [] },
}, { timestamps: true });

const Anime = mongoose.model("Anime", animeSchema);
export default Anime;
