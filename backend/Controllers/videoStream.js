import { GetObjectCommand } from "@aws-sdk/client-s3";
import connectS3 from "../config/aws_s3.js";
import dotenv from "dotenv";
dotenv.config();


const s3 = connectS3();

export const videoStream = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: "Video name is required." });
  }

  const bucketParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: name,
  };

  try {
    const command = new GetObjectCommand(bucketParams);
    const s3Response = await s3.send(command);

    res.setHeader("Content-Type", s3Response.ContentType || "video/mp4");
    res.setHeader("Content-Length", s3Response.ContentLength);
    res.setHeader("Accept-Ranges", "bytes");

    s3Response.Body.pipe(res).on("error", (err) => {
      console.error("Stream error:", err.message);
      return res.status(500).json({ message: "Error streaming the video." });
    });

  } catch (error) {
    if (error.name === "NoSuchKey" || error.Code === "NoSuchKey") {
      return res.status(404).json({ message: "Video not found in S3 bucket." });
    }

    console.error("S3 Fetch Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};