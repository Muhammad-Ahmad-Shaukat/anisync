import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    episodeId: { type: mongoose.Schema.Types.ObjectId, ref: "Episode", required: true },
    comment: { type: String, required: true },
    parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
  },
  { timestamps: true }
);

commentSchema.index({ episodeId: 1 });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
