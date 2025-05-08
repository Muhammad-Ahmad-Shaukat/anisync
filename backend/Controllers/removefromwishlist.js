import Wishlist from "../models/wishlist.js";
import User from "../models/User.js";

export const deleteFromWishlist = async (req, res) => {
    const userId = req.user.id;
    const { animeid } = req.body;
    if (!animeid) {
        return res.status(400).json({ message: "animeid is required" });
    }
    try {
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        wishlist.animeIds = wishlist.animeIds.filter(
            (id) => id.toString() !== animeid
        );
        await wishlist.save();
        return res.status(200).json({ message: "Anime removed from wishlist", wishlist: wishlist.animeIds });
    } catch (error) {
        console.error("Error deleting from wishlist:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
