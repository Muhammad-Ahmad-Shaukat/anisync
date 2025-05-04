import Anime from "../models/animeSchema.js";

export const findAnime = async (req, res) => {
  try {
    const { id, limit } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Query parameter 'id' is required." });
    }

    const query = id.toLowerCase();
    const resultLimit = parseInt(limit) > 0 ? parseInt(limit) : 10;

    let sortField = null;
    if (query === "top" || query === "trending") sortField = { popularity: -1 };
    else if (query === "new") sortField = { createdAt: -1 };
    else return res.status(400).json({ message: "Only 'top', 'trending', and 'new' are supported." });

    const animeList = await Anime.find({ categories: query }).sort(sortField).limit(resultLimit);

    const formatted = animeList.map(anime => ({
      id: anime.animeid,
      title: {
        english: anime.anime_name,
        romaji: anime.anime_name,
      },
      description: anime.description,
      bannerImage: anime.trailer || anime.image,
      coverImage: {
        large: anime.image,
      },
    }));

    return res.status(200).json(formatted);

  } catch (error) {
    console.error("Anime Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
