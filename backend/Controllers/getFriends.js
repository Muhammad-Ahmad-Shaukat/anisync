import Friend from "../models/friends.js";
import Users from "../models/User.js";

// Fetch current friends (accepted status only)
export const getCurrentFriends = async (req, res) => {
  const { userid } = req.query;

  if (!userid) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const user = await Users.findOne({ username: userid });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Get friends with "accepted" status
    const friendships = await Friend.find({
      $or: [
        { userId: user._id, status: "accepted" },
        { friendId: user._id, status: "accepted" }
      ]
    });

    const friendsIds = friendships.map(f => f.userId.toString() === user._id.toString() ? f.friendId : f.userId);
    const friends = await Users.find({ _id: { $in: friendsIds } });

    return res.status(200).json({ message: "Current friends fetched.", friends });
  } catch (error) {
    console.error("Error fetching current friends:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
