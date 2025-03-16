import express from "express";
import { signup } from "../Controllers/authController.js";
import { login } from "../Controllers/logincontroller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
