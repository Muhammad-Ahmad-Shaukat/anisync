import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Otp from '../models/OtpSchema';

dotenv.config();

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const generateOtp = () =>{
    const otp = Math.floor(100000+ Math.random()*900000).toString();
    hashotp = bcrypt.hashSync(otp, 10);
    return hashotp;
};

export const sendotp = async (req, res) => {
    try{
        const {email} = req.body;
        if(!email){
            return res.status(400).json({ message: "Email is required" });
        }
        const otp = generateOtp();
        await Otp.create({ email, otp });
        const sendmail = {
            from: process.env.EMAIL,
            to: email,
            subject: "Email Verification",
            text: `Your OTP is ${otp}\n\nThis OTP is valid for 5 minutes\nThnak you`
        }
        await transporter.sendMail(sendmail);
        res.status(200).json({ message: "OTP sent to email" });
    }catch(error){
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

