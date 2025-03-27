import Comment from "../models/comment.js";
import User from "../models/User.js";

export const allcomments = async (req, res) => {
    const { episodeId } = req.body;

    if (!episodeId) {
        return res.status(400).json({ message: "Error Occurred: All fields are required" });
    }

    try {
        const comments = await Comment.find({ episodeId, parentCommentId: null })
            .populate("userId", "username")
            .sort({ createdAt: -1 });

        const commentIds = comments.map(comment => comment._id);

        const replies = await Comment.find({ parentCommentId: { $in: commentIds } })
            .populate("userId", "username")
            .sort({ createdAt: 1 });

        const commentMap = {};
        comments.forEach(comment => {
            commentMap[comment._id] = { ...comment._doc, replies: [] };
        });

        replies.forEach(reply => {
            if (commentMap[reply.parentCommentId]) {
                commentMap[reply.parentCommentId].replies.push(reply);
            }
        });

        return res.status(200).json({ success: true, comments: Object.values(commentMap) });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const addcomment = async (req, res) => {
    const { episodeId, username, comment } = req.body;
    if (!episodeId || !username || !comment){
        return res.status(400).json({message: "Error All fields Required"});
    }
    try{
        const checkuser = await User.findOne({username});
        if (!checkuser){
            return res.status(400).json({message: "You have to login to comment"})
        }
        newcomment = new Comment({
            userId: checkuser._id,
            episodeId,
            comment,
            parentCommentId: null
        });
        await newcomment.save;
        res.status(200).json({message: "comment added"});

    }catch(error){
        return res.status(500).json({message: "Internal Server Error", error: error.message});
    }
};

export const addreply = async (req, res) =>{
    const { episodeId, username, comment, parentCommentId } = req.body;
    if (!episodeId || !username || !comment || !parentCommentId){
        return res.status(400).json({message: "Error All fields Required"});
    }
    try{
        const checkuser = await User.findOne({username});
        if (!checkuser){
            return res.status(400).json({message: "You have to login to comment"})
        }
        newcomment = new Comment({
            userId: checkuser._id,
            episodeId,
            comment,
            parentCommentId: parentCommentId
        });
        await newcomment.save;
        res.status(201).json({message: "comment added"});

    }catch(error){
        return res.status(500).json({message: "Internal Server Error", error: error.message});
    }
};
