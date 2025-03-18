
import bcrypt from 'bcrypt';
import Otp from '../models/OtpSchema.js';

export const verifyotp = async (req, res) => {
    const { email,otp } = req.body;
    if(!email || !otp){
        return res.status(400).json({ message: "Email or OTP is missing" });
    }
    try{
        const existingOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });
        if (!existingOtp) {
            return res.status(400).json({ message: "OTP Expiried" });
        }
        const isMatch = await bcrypt.compare(otp, existingOtp.otp);
        if(!isMatch){
            res.status(400).json({ message: "OTP verification Failed" });
        }
        await Otp.deleteMany({ email });
        res.status(200).json({ message: "OTP verified successfully" });
    }catch{
        res.status(500).json({ message: "Internal Server Error", error: error.message});
    }
};

