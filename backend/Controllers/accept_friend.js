import friends from "../models/friends.js";
import Users from "../models/User.js";

export const acceptfriend = async (req, res) => {
  const { userid, friendid, action } = req.query;

  if (!userid || !friendid || !action) {
    return res.status(400).json({ message: "User ID, Friend ID, and action are required." });
  }

  if (userid === friendid) {
    return res.status(409).json({ message: "You cannot be a friend of yourself." });
  }

  try {
    const user = await Users.findOne({ username: userid });
    const friend = await Users.findOne({ username: friendid });

    if (!user || !friend) {
      return res.status(404).json({ message: "User or Friend not found." });
    }

    const existingFriendship = await friends.findOne({ userId: user._id, friendId: friend._id, status: "pending" });

    act = action.toLowerCase();

    if (!existingFriendship) {
        return res.status(404).json({ message: "No pending friend request found." });
    }
    if (act === "accept") {
        existingFriendship.status = "accepted";
        existingFriendship.seen = true;
        await existingFriendship.save();
        return res.status(200).json({ message: "Friend request accepted." });
    } else if (action === "reject") {
        existingFriendship.status = "rejected";
        existingFriendship.seen = true;
        await existingFriendship.save();
        return res.status(200).json({ message: "Friend request rejected." });
    } else if (action === "block") {
        existingFriendship.status = "blocked";
        existingFriendship.seen = true;
        await existingFriendship.save();
        return res.status(200).json({ message: "User blocked." });
    }else {
        return res.status(400).json({ message: "Invalid action. Use 'accept' or 'reject'." });
    }
}catch (error) {
    console.error("Error accepting friend request:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
