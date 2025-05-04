import Anime from "../models/animeSchema.js";

export const fetchAnime = async (req, res) => {
  const { type = "top", genre, limit = 5 } = req.query;

  try {
    let query = {};
    let sort = {};

    switch (type) {
      case "top":
        query.categories = "top";
        sort = { rating: -1 };
        break;

      case "trending":
        query.categories = "trending";
        sort = { popularity: -1 };
        break;

      case "new":
        query.categories = "new";
        sort = { rating: -1 };
        break;

      case "airing":
      case "Currently Airing":
        query.categories = "airing";
        sort = { rating: -1 };
        break;

      case "genre":
        if (!genre) {
          return res.status(400).json({ error: "Genre must be provided when type is 'genre'" });
        }
        query.genres = genre;
        break;

      default:
        return res.status(400).json({ error: "Invalid type parameter" });
    }

    const animeList = await Anime.find(query).sort(sort).limit(Number(limit));

    const response = animeList.map(anime => ({
      id: anime.animeid,
      title: {
        english: anime.anime_name || "Unknown Title",
        romaji: anime.anime_name || "Unknown Title",
      },
      description: anime.description || "",
      bannerImage: anime.trailer || anime.image || "fallback.jpg",
      coverImage: {
        large: anime.image || "fallback.jpg",
      },
      genres: anime.genres || [],
      rating: anime.rating || 0,
      episodes: anime.episodes || 0,
      popularity: anime.popularity || 0,
      trailer: anime.trailer || "",
      status: anime.status || "Unknown",
      season: anime.season || "Unknown",
      source: anime.source || "Unknown",
    }));

    res.json(response);
  } catch (error) {
    console.error("Failed to fetch anime from DB:", error.message);
    res.status(500).json({ error: "Failed to fetch anime from database" });
  }
};
