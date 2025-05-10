import { HeadObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import connectS3 from "../config/aws_s3.js";
import dotenv from "dotenv";
import { URL } from "url";

dotenv.config();
const s3 = connectS3();

export const videoStream = async (req, res) => {
  let { url } = req.query;
  const range = req.headers.range;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ message: "Missing or invalid video URL." });
  }

  try {
    // Decode and extract key from full S3 URL
    url = decodeURIComponent(url.trim());

    if (url.startsWith("http")) {
      const parsed = new URL(url);
      url = parsed.pathname.startsWith("/") ? parsed.pathname.slice(1) : parsed.pathname;
    }
  } catch (e) {
    return res.status(400).json({ message: "Invalid video URL format." });
  }

  const bucketParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: url,
  };

  try {
    const headData = await s3.send(new HeadObjectCommand(bucketParams));
    const fileSize = headData.ContentLength;
    const contentType = headData.ContentType || "video/mp4";

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (isNaN(start) || isNaN(end) || start >= fileSize || end >= fileSize) {
        return res.status(416).json({ message: "Invalid range." });
      }

      const chunkSize = end - start + 1;

      const streamData = await s3.send(new GetObjectCommand({
        ...bucketParams,
        Range: `bytes=${start}-${end}`,
      }));

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": contentType,
      });

      streamData.Body.pipe(res);
    } else {
      const streamData = await s3.send(new GetObjectCommand(bucketParams));

      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": contentType,
      });

      streamData.Body.pipe(res);
    }
  } catch (err) {
    console.error("S3 Video Stream Error:", err);
    return res.status(404).json({ message: "Video not found or S3 error." });
  }
};
