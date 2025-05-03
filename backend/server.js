import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import connectS3 from "./config/aws_s3.js";
import { syncAnime } from "./Scripts/syncAnime.js";


dotenv.config();
connectDB();
connectS3();

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use("/api/auth", authRoutes);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinChat", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on("sendMessage", ({ roomId, message, sender }) => {
    io.to(roomId).emit("receiveMessage", { message, sender });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

(async () => {
  try {
    await syncAnime(); // Initial
    setInterval(syncAnime, 12 * 60 * 60 * 1000); // Every 12 hours
  } catch (err) {
    console.error("Sync failed:", err);
  }
})();
