import Anime from "../models/animeSchema.js";
import { Worker } from 'worker_threads';
import axios from "axios";

export const searchanime = async (req, res) => {
  try {
    let { q, limit = 1 } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Query parameter 'q' is required." });
    }

    q = q.trim();
    limit = parseInt(limit) || 10;

    const regex = new RegExp(q, "i");

    let localResults = await Anime.find({
      $or: [
        { anime_name: regex },
        { genres: regex },
        { description: regex },
      ]
    }).limit(limit);

    if (localResults.length >= limit) {
      return res.status(200).json(localResults);
    }

    const jikanRes = await axios.get(`https://api.jikan.moe/v4/anime`, {
      params: { q, limit: limit },
    });

    const fetchedAnimes = jikanRes.data?.data || [];

    const newAnimeList = [];

    for (let item of fetchedAnimes) {
      const exists = await Anime.findOne({ animeid: item.mal_id });
      if (exists) {
        newAnimeList.push(exists);
      } else {
        const newAnime = new Anime({
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
        });

      const worker = new Worker('./workers/searchAnimeWorker.js');
      worker.postMessage(animeData);

      worker.on('message', (message) => {
        if (message.success) {
          console.log(`Successfully added anime: ${message.animeid}`);
        } else {
          console.error(`Failed to add anime: ${message.animeid}`, message.error);
        }
      });

      newAnimeList.push(animeData)
      }

      if (localResults.length + newAnimeList.length >= limit) {
        break;
      }
    }

    const totalResults = [...localResults, ...newAnimeList];

    if (totalResults.length > 0) {
      return res.status(200).json(totalResults.slice(0, limit));
    }

    return res.status(404).json({ message: "No anime found matching your query." });

  } catch (error) {
    console.error("Anime search error:", error);
    res.status(500).json({ message: "Server error while searching anime.", error });
  }
};
