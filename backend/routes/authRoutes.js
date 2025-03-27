import express from "express";
import { signup } from "../Controllers/authController.js";
import { login } from "../Controllers/logincontroller.js";
import { verifyotp } from "../Controllers/verifyOtp.js";
import { sendotp } from "../Controllers/sentotp.js";
import { findAnime } from "../Controllers/animecontroller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verifyotp", verifyotp);
router.post("/sendotp", sendotp);
router.post("/findanime", findAnime)



export default router;
