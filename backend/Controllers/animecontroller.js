import Anime from "../models/animeSchema.js";

export const findAnime = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "Query parameter 'q' is required." });
    }

    const regex = new RegExp(q, "i");

    const results = await Anime.find({
      $or: [
        { anime_name: regex },
        { genres: regex },
        { description: regex },
      ],
    }).limit(20);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error while searching anime.", error });
  }
};
