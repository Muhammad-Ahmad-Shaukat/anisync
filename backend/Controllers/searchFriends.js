import Users from "../models/User.js";

export const searchFriends = async (req, res) => {
  const { searchTerm } = req.query; 

  if (!searchTerm) {
    return res.status(400).json({ message: "Search term is required." });
  }

  try {
    const users = await Users.find({
      $or: [
        { username: { $regex: searchTerm, $options: 'i' } }, 
        { name: { $regex: searchTerm, $options: 'i' } } 
      ]
    }).limit(10);
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error searching users:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
