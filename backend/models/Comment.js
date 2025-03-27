import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comment_type: { type: String, required: true, enum: ["Comment", "Reply"] },
  reply_id: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  comment: { type: String, required: true },
  episodeId: { type: mongoose.Schema.Types.ObjectId, ref: "Episode", required: true },
}, { timestamps: true });

commentSchema.index({ episodeId: 1 });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
