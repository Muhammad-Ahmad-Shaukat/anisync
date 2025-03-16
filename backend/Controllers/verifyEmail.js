import User from "../models/User.js";

export const verifyemail = async (req, res) => {
    return res.status(200).json({ message: "Email verified successfully" });
};