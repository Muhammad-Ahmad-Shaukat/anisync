import bcrypt from "bcrypt";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import connectS3 from "../config/aws_s3.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const s3 = connectS3();

export const updateUser = async (req, res) => {
  const { id, password } = req.body;
  const file = req.file;

  if (!id) {
    return res.status(400).json({ message: "No Id given" });
  }

  try {
    const conditions = [];
    if (mongoose.Types.ObjectId.isValid(id)) {
      conditions.push({ _id: id });
    }
    conditions.push({ username: id }, { email: id });

    const existingUser = await User.findOne({ $or: conditions });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
    }

    if (file && file.buffer) {
      const fileKey = `${id}`;
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const responses = await s3.send(new PutObjectCommand(params));
        if (responses.$metadata.httpStatusCode !== 200) {
            return res.status(500).json({ message: "Failed to upload file" });
        }
      existingUser.profilePic = responses.fileUrl;
    }

    await existingUser.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
