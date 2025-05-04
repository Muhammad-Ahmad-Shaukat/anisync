import { PutObjectCommand } from "@aws-sdk/client-s3";
import connectS3 from "../config/aws_s3.js";

const s3 = connectS3();

const uploadtoS3 = async (req, res) => {
  const { name } = req.body;
  const file = req.file;

  if (!name || !file || !file.buffer) {
    return res.status(400).json({ error: "Name and valid file are required" });
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: name,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3.send(new PutObjectCommand(params));

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${name}`;

    res.status(200).json({ message: "File uploaded successfully", url: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};

export default uploadtoS3;
