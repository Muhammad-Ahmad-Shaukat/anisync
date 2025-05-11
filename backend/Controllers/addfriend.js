import friends from "../models/friends.js";
import Users from "../models/User.js";

export const addFriend = async (req, res) => {
  const { userid, friendid } = req.body;

  if (!userid || !friendid) {
    return res.status(400).json({ message: "User ID and Friend ID are required." });
  }

  if (userid === friendid) {
    return res.status(409).json({ message: "You cannot send a friend request to yourself." });
  }

  try {
    const user = await Users.findOne({ username: userid });
    const friend = await Users.findById(friendid); // Use _id directly

    if (!user || !friend) {
      return res.status(404).json({ message: "User or Friend not found." });
    }

    const existingFriendship = await friends.findOne({
      $or: [
        { userId: user._id, friendId: friend._id },
        { userId: friend._id, friendId: user._id }
      ]
    });

    if (existingFriendship) {
      if (existingFriendship.status === "accepted") {
        return res.status(409).json({ message: "You are already friends." });
      }

      if (["pending", "rejected"].includes(existingFriendship.status)) {
        existingFriendship.status = "pending";
        existingFriendship.seen = false;
        await existingFriendship.save();
        return res.status(200).json({ message: "Friend request resent." });
      }

      if (existingFriendship.status === "blocked") {
        return res.status(403).json({ message: "You are blocked by this user." });
      }
    }

    const newFriendship = new friends({
      userId: user._id,
      friendId: friend._id,
      status: "pending",
    });

    await newFriendship.save();
    return res.status(201).json({ message: "Friend request sent." });

  } catch (error) {
    console.error("Error adding friend:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
