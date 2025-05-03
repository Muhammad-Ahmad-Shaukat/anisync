import Anime from "../models/animeSchema.js";

export const findAnime = async (req, res) => {
  try {
    const { id, limit } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Search ID is required (anime name, genre, or category)." });
    }

    const query = id.toLowerCase();
    const resultLimit = parseInt(limit) > 0 ? parseInt(limit) : 10; 
    let result = [];

    if (["trending", "top", "popular"].includes(query)) {
      result = await Anime.find({}).sort({ popularity: -1 }).limit(resultLimit);
    } else if (["new", "newest", "latest"].includes(query)) {
      result = await Anime.find({}).sort({ createdAt: -1 }).limit(resultLimit);
    } else {
      result = await Anime.find({
        $or: [
          { anime_name: { $regex: query, $options: "i" } },
          { genres: { $elemMatch: { $regex: query, $options: "i" } } },
          { categories: { $elemMatch: { $regex: query, $options: "i" } } }
        ]
      }).limit(resultLimit);
    }

    if (!result.length) {
      return res.status(404).json({ message: "No matching anime found." });
    }

    return res.status(200).json({ result });

  } catch (error) {
    console.error("Anime Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};