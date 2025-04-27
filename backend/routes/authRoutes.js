import express from "express";
import { signup } from "../Controllers/authController.js";
import { login } from "../Controllers/logincontroller.js";
import { verifyotp } from "../Controllers/verifyOtp.js";
import { sendotp } from "../Controllers/sentotp.js";
import { findAnime } from "../Controllers/animecontroller.js";
import { getTopAnime } from "../Controllers/topAnimeController.js";
import { videoStream } from "../Controllers/videoStream.js";
import { addFriend } from "../Controllers/addfriend.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verifyotp", verifyotp);
router.post("/sendotp", sendotp);
router.post("/findanime", findAnime);
router.get("/top-anime", getTopAnime);
router.get("/video-stream", videoStream);
router.post("/add-friend", addFriend);

export default router;
