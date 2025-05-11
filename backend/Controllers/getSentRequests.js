import Friend from "../models/friends.js";
import Users from "../models/User.js";


export const getSentFriendRequests = async (req, res) => {
  const { userid } = req.query;

  if (!userid) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const user = await Users.findOne({ username: userid });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Get sent friend requests (pending only)
    const sentRequests = await Friend.find({
      userId: user._id,
      status: "pending"
    });

    const sentRequestIds = sentRequests.map(f => f.friendId);
    const sentFriends = await Users.find({ _id: { $in: sentRequestIds } });

    return res.status(200).json({ message: "Sent friend requests fetched.", sentRequests: sentFriends });
  } catch (error) {
    console.error("Error fetching sent friend requests:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};