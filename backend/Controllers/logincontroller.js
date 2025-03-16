import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
        }
    
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
        return res.status(400).json({ message: "User does not exist" });
        }
    
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
        }
    
        res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}