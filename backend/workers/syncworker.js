import { parentPort } from "worker_threads";
import { syncAnime } from "../Scripts/syncAnime.js";
import dotenv from 'dotenv';
import connectDB from "../config/db.js";
import connectS3 from "../config/aws_s3.js";

dotenv.config();
await connectDB();
connectS3();

(async () => {
  try {
    await syncAnime();
    parentPort.postMessage("Sync complete");
  } catch (err) {
    parentPort.postMessage(`Sync failed: ${err.message}`);
  }
})();
