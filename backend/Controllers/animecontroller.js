import Anime from "../models/animeSchema.js";
import axios from "axios";

export const findAnime = async (req, res) => {
  try {
    let { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "Query parameter 'q' is required." });
    }

    q = q.trim();

    // Exact name match
    let anime = await Anime.find({
      anime_name: { $regex: `^${q}$`, $options: "i" }
    });

    if (anime.length > 0) {
      return res.status(200).json(anime);
    }

    // Loose match: genre or description
    const regex = new RegExp(q, "i");
    const results = await Anime.find({
      $or: [
        { genres: regex },
        { description: regex },
      ]
    }).limit(20);

    if (results.length > 0) {
      return res.status(200).json(results);
    }

    // Fetch from Jikan API
    const jikanRes = await axios.get(`https://api.jikan.moe/v4/anime`, {
      params: { q, limit: 3 }, // get more results for better match checking
    });

    if (jikanRes.data?.data?.length > 0) {
      // Try to find an exact title match
      const animeFromApi = jikanRes.data.data.find(
        (item) => item.title.trim().toLowerCase() === q.toLowerCase()
      );

      if (animeFromApi) {
        const existing = await Anime.findOne({ animeid: animeFromApi.mal_id });
        if (existing) {
          return res.status(200).json([existing]);
        }

        const newAnime = new Anime({
          animeid: animeFromApi.mal_id,
          anime_name: animeFromApi.title,
          genres: animeFromApi.genres.map((g) => g.name),
          rating: animeFromApi.score || 0,
          episodes: animeFromApi.episodes || 0,
          popularity: animeFromApi.popularity || 999999,
          image: animeFromApi.images.jpg.large_image_url || animeFromApi.images.jpg.image_url,
          description: animeFromApi.synopsis || "No description available.",
          trailer: animeFromApi.trailer?.url || "",
          status: animeFromApi.status || "Unknown",
          season: animeFromApi.season || "Unknown",
          source: animeFromApi.source || "Unknown",
          characters: [],
          categories: [],
        });

        await newAnime.save();
        return res.status(200).json([newAnime]);
      }
    }

    // Fallback
    let fallbackAnime = await Anime.findOne({ anime_name: "404 Not Found" });

    if (!fallbackAnime) {
      fallbackAnime = new Anime({
        animeid: -1,
        anime_name: "404 Not Found",
        genres: ["Unknown"],
        rating: 0,
        episodes: 0,
        popularity: 999999,
        image: "https://via.placeholder.com/300x450?text=Not+Found",
        description: "The anime you're looking for could not be found.",
        trailer: "",
        status: "Unknown",
        season: "Unknown",
        source: "Unknown",
        characters: [],
        categories: [],
      });

      await fallbackAnime.save();
    }

    return res.status(200).json([fallbackAnime]);

  } catch (error) {
    console.error("Anime search error:", error);
    res.status(500).json({ message: "Server error while searching anime.", error });
  }
};
