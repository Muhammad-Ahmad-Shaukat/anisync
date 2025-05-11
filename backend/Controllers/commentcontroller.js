import Comment from "../models/comment.js";
import User from "../models/User.js";
import Episode from "../models/Episode.js";

export const createcomment = async (req, res) => {
    const { userid, comment, episodeid } = req.body;
    console.log(userid,comment,episodeid)
    if (!userid || !comment || !episodeid) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        
        const userExists = await User.findById(userid);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }
        const episodeExists = await Episode.findById(episodeid);
        if (!episodeExists) {
            return res.status(404).json({ message: "Episode not found" });
        }
        const newComment = new Comment({
            userId: userid,
            episodeId: episodeid,
            comment: comment,
        });
        const savedComment = await newComment.save();
        const populatedComment = await Comment.findById(savedComment._id)
            .populate("userId", "username profilePicSrc");
        return res.status(201).json(populatedComment);
    } catch (error) {
        console.error("Error creating comment:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

