import express from "express";
import { signup } from "../Controllers/authController.js";
import { login } from "../Controllers/logincontroller.js";
import { verifyemail } from "../Controllers/verifyEmail.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-email", verifyemail);

export default router;
