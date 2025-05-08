import Wishlist from "../models/wishlist.js";
import User from "../models/User.js";
import Anime from "../models/animeSchema.js";

export const addToWishlist = async (req, res) => {
    const userid = req.user.id;
    const { animeid } = req.body;
    if (!userid || !animeid) {
        return res.status(400).json({ message: "User ID and Anime ID are required" });
    }
    try {
        const [userExists, animeExists] = await Promise.all([
            User.findById(userid),
            Anime.findById(animeid)
        ]);
        if (!userExists || !animeExists) {
            return res.status(404).json({ message: "User or Anime not found" });
        }
        let wishlistDoc = await Wishlist.findOne({ userId: userid });
        if (wishlistDoc) {
            if (wishlistDoc.animeIds.includes(animeid)) {
                return res.status(400).json({ message: "Anime already in wishlist" });
            }
            wishlistDoc.animeIds.push(animeid);
            await wishlistDoc.save();
        } else {
            wishlistDoc = new Wishlist({
                userId: userid,
                animeIds: [animeid]
            });
            await wishlistDoc.save();
        }

        return res.status(200).json({ message: "Anime added to wishlist successfully" });

    } catch (error) {
        console.error("Error adding to wishlist:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
