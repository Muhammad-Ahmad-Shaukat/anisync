import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    episodeId: { type: mongoose.Schema.Types.ObjectId, ref: "Episode", required: true },
    comment: { type: String, required: true },
    likes: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
    isSpoiler: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Indexes
commentSchema.index({ episodeId: 1 });

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;
