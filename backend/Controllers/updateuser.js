import bcrypt from "bcrypt";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import connectS3 from "../config/aws_s3.js";
import User from "../models/User.js";

const s3 = connectS3();

export const updateUser = async (req, res) => {
  const { id, password } = req.body;
  const file = req.file;

  if (!id) {
    return res.status(400).json({ message: "No Id given" });
  }

  try {
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
    }

    if (file && file.buffer) {
      const fileKey = `${id}/profile-${Date.now()}-${file.originalname}`;

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      try {
        await s3.send(new PutObjectCommand(params));

        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
        existingUser.profilepic = fileUrl;
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        return res.status(500).json({ message: "Failed to upload profile picture" });
      }
    }

    await existingUser.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
