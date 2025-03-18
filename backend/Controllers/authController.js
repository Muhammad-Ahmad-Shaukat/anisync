import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try {
      const { username, email, password } = req.body;  
      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingEmail = await User.findOne({ email });
      const existingUsername = await User.findOne({username});

      if (existingUsername || existingEmail) {
        return res.status(400).json({ message: "Username or Email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(" Signup Error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };