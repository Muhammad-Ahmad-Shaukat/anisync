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


export default router;
