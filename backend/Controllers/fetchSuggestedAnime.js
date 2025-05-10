import Anime from "../models/animeSchema.js";

export const fetchSuggestedAnime = async (req, res) => {
  const { animeid, limit = 5 } = req.query;

  try {
    if (!animeid) {
      return res.status(400).json({ error: "animeid is required for suggestions" });
    }

    const originalAnime = await Anime.findOne({ animeid });

    if (!originalAnime) {
      return res.status(404).json({ error: "Original anime not found" });
    }

    const { anime_name, genres } = originalAnime;

    // Build query to find suggestions by genre or similar name
    const query = {
      $and: [
        { animeid: { $ne: animeid } }, // Exclude the current anime
        {
          $or: [
            { genres: { $in: genres } },
            { anime_name: { $regex: anime_name.split(" ")[0], $options: "i" } } // Partial name match
          ]
        }
      ]
    };

    const suggestions = await Anime.find(query).limit(Number(limit));

    const response = suggestions.map(anime => ({
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
    console.error("Error fetching suggested anime:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
