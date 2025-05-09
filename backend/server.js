import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Worker } from "worker_threads";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import connectS3 from "./config/aws_s3.js";
import { syncAnime } from "./Scripts/syncAnime.js";


dotenv.config();
connectDB();
connectS3();

const app = express();
const server = createServer(app);

function runSyncWorker() {
  const worker = new Worker("./workers/syncworker.js", { type: "module" });

  worker.on("message", msg => {
    console.log(`[Worker] ${msg}`);
  });

  worker.on("error", err => {
    console.error(`[Worker Error] ${err}`);
  });

  worker.on("exit", code => {
    if (code !== 0) console.error(`Worker stopped with exit code ${code}`);
  });
}


app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

runSyncWorker();
setInterval(runSyncWorker, 12 * 60 * 60 * 1000);
