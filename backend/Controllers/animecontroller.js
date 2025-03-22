import Anime from "../models/animeSchema.js";

export const findAnime = async (req, res) => {
    try {
        const { name, animeid } = req.body;

        if (!name && !animeid) {
            return res.status(400).json({ message: "Name or ID required" });
        }

        let existingAnime = null;

        if (name) {
            existingAnime = await Anime.findOne({ name: new RegExp("^" + name + "$", "i") });
        } else if (animeid) {
            existingAnime = await Anime.findOne({ animeid });
        }

        if (existingAnime) {
            return res.status(200).json({ message: "Anime found", anime: existingAnime });
        } else {
            return res.status(404).json({ message: "Anime not found" });
        }
    } catch (error) {
        console.error("Anime Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
