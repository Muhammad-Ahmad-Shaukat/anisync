import Wishlist from "../models/wishlist.js";
import User from "../models/User.js";

export const getWishlist = async (req, res) => {
    const userId = req.user.id;
    try{
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const wishlist = await Wishlist.findOne({ userId: userId }).populate("animeIds");
        if (!wishlist) {
            return res.status(200).json({ wishlist: [] });
        }
        return res.status(200).json({ wishlist });
    }catch (error) {
        console.error("Error fetching wishlist:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}