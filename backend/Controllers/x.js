import mongoose from "mongoose";
import fetch from "node-fetch";
import Anime from "../models/Anime.js";

const MONGO_URI = "mongodb://localhost:27017/yourdbname"; // Change this

const syncAnime = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const res = await fetch("https://api.jikan.moe/v4/top/anime?limit=25");
    const json = await res.json();

    for (const item of json.data) {
      const animeData = {
        animeid: item.mal_id,
        anime_name: item.title,
        genres: item.genres.map(g => g.name),
        rating: item.score ?? 0,
        episodes: item.episodes ?? 0,
        popularity: item.popularity ?? 0,
        image: item.images.jpg.image_url,
        description: item.synopsis ?? "",
        trailer: item.trailer?.url || "",
        status: item.status ?? "Unknown",
        season: item.season ?? "Unknown",
        source: item.source ?? "Unknown",
        characters: [] // You can fill this later via another endpoint
      };

      await Anime.updateOne(
        { animeid: item.mal_id },
        animeData,
        { upsert: true }
      );
    }

    console.log("Anime data synced successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error syncing anime:", error);
    process.exit(1);
  }
};

syncAnime();
