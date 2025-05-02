import Comment from "../models/comment.js";
import Episode from "../models/Episode.js";

export const getcomment = async (req, res) => {
    const {episodeid} = req.params;
    if (!episodeid) {
        return res.status(400).json({ message: "Episode ID is required" });
    }
    try {
        const episodeExists = await Episode.findById(episodeid);
        if (!episodeExists) {
            return res.status(404).json({ message: "Episode not found" });
        }
        const comments = await Comment.find({ episodeId: episodeid })
            .populate("userId", "username profilePicSrc")
            .sort({ createdAt: -1 });
        return res.status(200).json(comments);
    }catch (error) {
        console.error("Error checking episode existence:", error);
        return res.status(500).json({ message: "Server error" });
    }
}