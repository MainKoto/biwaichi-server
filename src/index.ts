import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.get("/", (_req, res) => {
  res.send("Hello from biwaichi-share server!");
});

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });

  // 例: クライアントからの位置データを受け取って全クライアントにブロードキャストする
  socket.on("position", (data: { lat: number; lng: number; speed: number }) => {
    console.log(`Position from ${socket.id}:`, data);
    io.emit("position", data);
  });
});

const PORT = Number(process.env.PORT) || 4000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`⚡️ Socket.IO server running on port ${PORT}`);
});
