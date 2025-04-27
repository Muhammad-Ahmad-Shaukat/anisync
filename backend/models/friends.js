import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  friendId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected", "blocked"], default: "pending" },
  seen: { type: Boolean, default: false },
}, { timestamps: true });

const Friend = mongoose.model("Friend", friendSchema);
export default Friend;