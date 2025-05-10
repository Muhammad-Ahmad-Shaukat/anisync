import Episode from "../models/Episode.js";
import Anime from "../models/animeSchema.js";

export const fetchEpisodes = async (req, res) => {
    const { animeId } = req.body;
    if (!animeId) {
        return res.status(400).json({ message: "Anime ID is required." });
    }
    try{
        const findanime = await Anime.findById(animeId);
        if (!findanime) {
            return res.status(404).json({ message: "Anime not found." });
        }
        const episodes = await Episode.find({ animeId: animeId }).sort({ episode_number: 1 });
        if (!episodes || episodes.length === 0) {
            return res.status(404).json({ message: "No episodes found for this anime." });
        }
        const formattedEpisodes = episodes.map((episode) => ({
            id: episode._id,
            title: episode.episode_title,
            videoName: episode.video_src,
            episode_number: episode.episode_number,
            episode_pic_src: episode.episode_pic_src
        }));
        return res.status(200).json({ episodes: formattedEpisodes });
    }catch (error) {
        console.error("Error fetching episodes:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}