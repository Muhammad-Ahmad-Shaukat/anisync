import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    episodeId: { type: mongoose.Schema.Types.ObjectId, ref: "Episode", required: true },
    comment: { type: String, required: true },
    parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
    likes: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
    depth: { type: Number, default: 0 },
  },
  { timestamps: true }
);

commentSchema.index({ episodeId: 1 });
commentSchema.index({ parentCommentId: 1 });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;