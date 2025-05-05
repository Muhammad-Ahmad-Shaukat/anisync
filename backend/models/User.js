import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { 
    type: String, 
    default: "https://anisyncweb.s3.eu-north-1.amazonaws.com/standard_profile_pic.jpg"
  }
  }, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
