import Users from "../models/User.js"; // Ensure you're importing the User model

// Controller to search for users in the database
export const searchFriends = async (req, res) => {
  const { searchTerm } = req.query; // Get the search term from the query string

  if (!searchTerm) {
    return res.status(400).json({ message: "Search term is required." });
  }

  try {
    // Find users that match the search term in their username or name
    const users = await Users.find({
      $or: [
        { username: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in username
        { name: { $regex: searchTerm, $options: 'i' } } // Case-insensitive search in name
      ]
    }).limit(10); // Optionally, limit the numb
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error searching users:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
