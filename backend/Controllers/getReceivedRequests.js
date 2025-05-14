import Friend from "../models/friends.js";
import Users from "../models/User.js";

export const getReceivedFriendRequests = async (req, res) => {
  const { userid } = req.query;

  if (!userid) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const user = await Users.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const receivedRequests = await Friend.find({
      friendId: user._id,
      status: "pending"
    });

    const receivedRequestIds = receivedRequests.map(f => f.userId);
    const receivedFriends = await Users.find({ _id: { $in: receivedRequestIds } });

    return res.status(200).json({ message: "Received friend requests fetched.", receivedRequests: receivedFriends });
  } catch (error) {
    console.error("Error fetching received friend requests:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};