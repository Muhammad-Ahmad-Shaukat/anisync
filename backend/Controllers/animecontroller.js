import Anime from "../models/animeSchema.js";

export const findAnime = async (req, res) => {
  try {
    const { name, animeid } = req.body;

    if (!name && !animeid) {
      return res.status(400).json({ message: "Name or animeid is required" });
    }

    let result = [];

    if (animeid) {
      const anime = await Anime.findOne({ animeid });
      if (anime) result.push(anime);
    }

    if (name) {
      const query = name.toLowerCase();
      if (["trending", "top", "popular"].includes(query)) {
        result = await Anime.find({}).sort({ popularity: -1 }).limit(5);
      } else if (query === "new" || query === "newest" || query === "latest") {
        result = await Anime.find({}).sort({ createdAt: -1 }).limit(5);
      } else {
        result = await Anime.find({
          $or: [
            { anime_name: { $regex: query, $options: "i" } },
            { genre: { $regex: query, $options: "i" } }
          ]
        });
      }
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
