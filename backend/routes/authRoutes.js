import express from "express";
import multer from 'multer';
import { signup } from "../Controllers/authController.js";
import { login } from "../Controllers/logincontroller.js";
import { verifyotp } from "../Controllers/verifyOtp.js";
import { sendotp } from "../Controllers/sentotp.js";
import { findAnime } from "../Controllers/animecontroller.js";
import { getTopAnime } from "../Controllers/topAnimeController.js";
import { videoStream } from "../Controllers/videoStream.js";
import { addFriend } from "../Controllers/addfriend.js";
import { getcomment } from "../Controllers/getcommentcontroller.js";
import { fetchAnime } from "../Controllers/fetchanime.js";
import { updateUser } from "../Controllers/updateuser.js";
import { healthCheck } from "../Controllers/health.js";
import { searchanime } from "../Controllers/searchanime.js";
import { addToWishlist } from "../Controllers/addtowishlist.js";
import { verifyToken } from "../middleware/auth.js";
import { getUser } from "../Controllers/getuser.js";
import { getWishlist } from "../Controllers/getwishlist.js";
import { deleteFromWishlist } from "../Controllers/removefromwishlist.js";
const router = express.Router();
const upload = multer();

router.post("/signup", signup);
router.get("/getcomment", getcomment);
router.post("/login", login);
router.post("/verifyotp", verifyotp);
router.post("/sendotp", sendotp);
router.get("/findanime", findAnime);
router.get("/topanime", getTopAnime);
router.get("/video-stream", videoStream);
router.post("/add-friend", addFriend);
router.get("/fetchAnime", fetchAnime)
router.patch('/updateuser', upload.single('avatar'), updateUser);
router.get("/health", healthCheck);
router.get("/searchanime", searchanime);
router.post("/addtowishlist", verifyToken,addToWishlist);
router.get("/getuser", verifyToken, getUser);
router.get("/getwislist" , verifyToken, getWishlist);
router.patch("/removefromwishlist", verifyToken, deleteFromWishlist);


export default router;
