import Anime from "../models/animeSchema.js";

export const fetchAnime = async (req, res) => {
  const { type = "top", genre, limit = 5 } = req.query;

  try {
    let query = {};
    let sort = {};

    switch (type) {
      case "top":
        sort = { rating: -1 };
        break;

      case "top_airing":
        query.status = "Currently Airing";
        sort = { rating: -1 };
        break;

      case "trending":
        sort = { popularity: -1 };
        break;

      case "genre":
        if (genre) query.genres = genre;
        break;

      default:
        return res.status(400).json({ error: "Invalid type parameter" });
    }

    const animeList = await Anime.find(query).sort(sort).limit(Number(limit));

    const response = animeList.map(anime => ({
      id: anime.animeid,
      title: {
        english: anime.anime_name,
        romaji: anime.anime_name,
      },
      description: anime.description,
      bannerImage: anime.image,
      coverImage: {
        large: anime.image,
      },
      genres: anime.genres,
      rating: anime.rating,
      episodes: anime.episodes,
      popularity: anime.popularity,
      trailer: anime.trailer,
      status: anime.status,
      season: anime.season,
      source: anime.source,
    }));

    res.json(response);
  } catch (error) {
    console.error("Failed to fetch anime from DB:", error.message);
    res.status(500).json({ error: "Failed to fetch anime from database" });
  }
};
