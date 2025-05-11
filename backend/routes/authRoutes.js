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
import { fetchEpisodes } from "../Controllers/fetchepisodes.js";
import { fetchSuggestedAnime } from "../Controllers/fetchSuggestedAnime.js";
import { searchFriends } from "../Controllers/searchFriends.js";
import { getCurrentFriends } from "../Controllers/getFriends.js";
import { getSentFriendRequests } from "../Controllers/getSentRequests.js";
import { getReceivedFriendRequests } from "../Controllers/getReceivedRequests.js";
import { acceptfriend } from "../Controllers/accept_friend.js";
import { getAnimeById } from "../Controllers/getanimebyid.js"
import {createcomment} from '../Controllers/commentcontroller.js'
import { getWishlistAnime } from "../Controllers/getWishListAnime";
const router = express.Router();
const upload = multer();

router.post("/signup", signup);
router.get("/comments/:episodeid", getcomment);
router.post("/login", login);
router.post("/verifyotp", verifyotp);
router.post("/sendotp", sendotp);
router.get("/findanime", findAnime);
router.get("/topanime", getTopAnime);
router.get("/video-stream", videoStream);
router.post("/addfriend", addFriend);
router.get("/fetchAnime", fetchAnime)
router.patch('/updateuser', upload.single('avatar'), updateUser);
router.get("/health", healthCheck);
router.get("/searchanime", searchanime);
router.post("/addtowishlist", verifyToken,addToWishlist);
router.get("/getuser", verifyToken, getUser);
router.get("/getwislist" , verifyToken, getWishlist);
router.patch("/removefromwishlist", verifyToken, deleteFromWishlist);
router.post("/fetchepisodes", fetchEpisodes);
router.get('/suggestedanime',fetchSuggestedAnime)
router.get('/searchfriends', searchFriends)
router.get('/getfriends', getCurrentFriends)
router.get('/getSentRequests',getSentFriendRequests)
router.get('/getReceivedFriendRequests',getReceivedFriendRequests)
router.post('/acceptreq',acceptfriend)
router.get('/getanimebyid/:animeid', getAnimeById)
router.post('/comments', createcomment)
router.post("/wishlistanime", getWishlistAnime);

export default router;
