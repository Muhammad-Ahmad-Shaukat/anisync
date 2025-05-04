import mongoose from "mongoose";

const animeSchema = new mongoose.Schema({
  animeid: { type: Number, required: true, unique: true }, // mal_id
  anime_name: { type: String, required: true, unique: true }, // title (English or Romaji)
  genres: { type: [String], required: true }, // genres.map(g => g.name)
  rating: { type: Number, required: true }, // score
  episodes: { type: Number, required: true },
  popularity: { type: Number, required: true },
  image: { type: String, required: true }, // cover image large
  description: { type: String },
  trailer: { type: String }, // trailer URL
  status: { type: String, required: true },
  season: { type: String },
  source: { type: String },
  characters: { type: [String] }, // fill if needed later
  categories: { type: [String], default: [] }, // optional
}, { timestamps: true });

const Anime = mongoose.model("Anime", animeSchema);
export default Anime;
