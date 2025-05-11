import Anime from "../models/animeSchema.js";
import { Worker } from 'worker_threads';
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

// Convert ES module path to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const searchanime = async (req, res) => {
  try {
    let { q, limit = 1 } = req.query;

    if (!q) return res.status(400).json({ message: "Query parameter 'q' is required." });

    q = q.trim();
    limit = parseInt(limit) || 10;

    const regex = new RegExp(q, "i");

    // Step 1: Search local DB
    const localResults = await Anime.find({
      $or: [
        { anime_name: regex },
        { genres: regex },
        { description: regex },
      ]
    }).limit(limit);

    // Add 'mongoid' to each local result
    const formattedLocalResults = localResults.map(doc => {
      const obj = doc.toObject();
      obj.mongoid = obj._id;
      return obj;
    });

    if (formattedLocalResults.length >= limit) {
      return res.status(200).json(formattedLocalResults);
    }

    // Step 2: Fetch from Jikan API
    const jikanRes = await axios.get(`https://api.jikan.moe/v4/anime`, {
      params: { q, limit },
    });

    const fetchedAnimes = jikanRes.data?.data || [];

    const localIds = formattedLocalResults.map(a => a.animeid);
    const newAnimeList = [];

    for (const item of fetchedAnimes) {
      if (localIds.includes(item.mal_id)) continue;

      const existing = await Anime.findOne({ animeid: item.mal_id });

      if (existing) {
        const obj = existing.toObject();
        obj.mongoid = obj._id;
        newAnimeList.push(obj);
      } else {
        const animeData = {
          animeid: item.mal_id,
          anime_name: item.title,
          genres: item.genres.map((g) => g.name),
          rating: item.score || 0,
          episodes: item.episodes || 0,
          popularity: item.popularity || 999999,
          image: item.images.jpg.large_image_url || item.images.jpg.image_url,
          description: item.synopsis || "No description available.",
          trailer: item.trailer?.url || "",
          status: item.status || "Unknown",
          season: item.season || "Unknown",
          source: item.source || "Unknown",
          characters: [],
          categories: [],
        };

        // Run background worker to save this anime
        new Worker(path.join(__dirname, '../workers/addAnimeWorker.js'), {
          workerData: { animeid: item.mal_id }
        });

        newAnimeList.push(animeData); // This one won’t have mongoid
      }

      if ((formattedLocalResults.length + newAnimeList.length) >= limit) break;
    }

    const totalResults = [...formattedLocalResults, ...newAnimeList];

    return res.status(totalResults.length > 0 ? 200 : 404).json(
      totalResults.length > 0
        ? totalResults.slice(0, limit)
        : { message: "No anime found matching your query." }
    );

  } catch (error) {
    console.error("Anime search error:", error);
    res.status(500).json({ message: "Server error while searching anime.", error });
  }
};
