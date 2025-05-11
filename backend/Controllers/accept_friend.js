import friends from "../models/friends.js";
import Users from "../models/User.js";

export const acceptfriend = async (req, res) => {
  const { userid, friendid, action } = req.body;

  if (!userid || !friendid || !action) {
    return res.status(400).json({ message: "User ID, Friend ID, and action are required." });
  }

  if (userid === friendid) {
    return res.status(409).json({ message: "You cannot be a friend of yourself." });
  }

  try {
    // Find users by _id instead of username
    const user = await Users.findById(userid);
    const friend = await Users.findById(friendid);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or Friend not found." });
    }

 const existingFriendship = await friends.findOne({
  $or: [
    { userId: user._id, friendId: friend._id },
    { userId: friend._id, friendId: user._id },
  ],
});


    const act = action.toLowerCase();

    if (!existingFriendship) {
      return res.status(404).json({ message: "No pending friend request found." });
    }

    if (act === "accept") {
      existingFriendship.status = "accepted";
    } else if (act === "reject") {
      existingFriendship.status = "rejected";
    } else if (act === "block") {
      existingFriendship.status = "blocked";
    } else {
      return res.status(400).json({ message: "Invalid action. Use 'accept', 'reject', or 'block'." });
    }

    existingFriendship.seen = true;
    await existingFriendship.save();

    return res.status(200).json({ message: `Friend request ${act}ed.` });
  } catch (error) {
    console.error("Error processing friend request:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
