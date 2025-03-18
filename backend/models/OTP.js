import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email : {type: String, required: true, unique: true},
    otp : {type: String, required: true},
    createddate : {type: Date, default: Date.now, expires: 300}},
);

export default mongoose.model("Otp", otpSchema);