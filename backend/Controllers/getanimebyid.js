import Anime from "../models/animeSchema.js";

export const getAnimeById = async (req, res) => {
    const { animeid } = req.params;
    if (!animeid) {
        return res.status(400).json({ message: "Anime ID is required" });
    }
    try{
        const anime = await Anime.findById(animeid);
        if (!anime) {
            return res.status(404).json({ message: "Anime not found" });
        }
        const formattedAnime = {
            id: anime._id,
            title: anime.title,
            description: anime.description,
            genres: anime.genres,
            status: anime.status,
            releaseDate: anime.releaseDate,
            episodes: anime.episodes,
            imageSrc: anime.imageSrc,
            trailerSrc: anime.trailerSrc
        };
        return res.status(200).json(formattedAnime);
    }catch (error) {
        console.error("Error fetching anime by ID:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}