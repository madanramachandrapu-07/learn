const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const http = require('http');             // ⬅️ add
const { Server } = require('socket.io');  // ⬅️ add
require('dotenv').config();

const app = express();
const server = http.createServer(app);    // ⬅️ use http server
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5000", // adjust if frontend served elsewhere
//     methods: ["GET", "POST"]
//   }
// });
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5000", "https://your-ngrok-url.ngrok-free.app"],
    methods: ["GET", "POST"]
  }
});


// Middleware
app.use(express.json());
// Be sure to replace this with your actual ngrok URL
const allowedOrigins = ["http://localhost:5000", "https://lahoma-severable-marguerite.ngrok-free.app"];

app.use(cors({
    origin: allowedOrigins,
    // 👇 Add this line to allow your custom token header
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"] 
}));
app.use(express.static('../frontend')); 

// Serve uploads folder for files (images, docs, videos, etc.)
app.use("/uploads", express.static(path.join(__dirname, "routes", "uploads")));

// Serve frontend (if you want to serve static frontend build)
app.use(express.static(path.join(__dirname, "../frontend")));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/share2learn";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch(err => console.error("❌ Could not connect to MongoDB...", err));

// Authentication routes
app.use("/api/auth", require("./routes/auth"));

// Profile routes
app.use("/api/profile", require("./routes/profile"));

// Request routes
app.use("/api/requests", require("./routes/requestRoutes"));

// Connections routes
app.use("/api/connections", require("./routes/connectionRoutes"));

// Message routes
app.use("/api/messages", require("./routes/messageRoutes"));

// User routes
app.use("/api/users", require("./routes/userRoutes"));

// Fallback for SPA routing (optional if using frontend framework)
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/index.html"));
// });


// 🔌 SOCKET.IO EVENTS
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // join personal room (so we can send messages directly)
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  // forward message to recipient
  socket.on("sendMessage", (message) => {
    io.to(message.receiver).emit("receiveMessage", message);
  });

  // socket.on("disconnect", () => {
  //   console.log("User disconnected:", socket.id);
  // });

  // 📩 Call invitation
  socket.on("call-user", ({ from, to, roomId }) => {
    console.log(`📞 Call from ${from} to ${to} in room ${roomId}`);
    io.to(to).emit("incoming-call", { from, roomId });
  });

  // ✅ Callee accepted
  socket.on("call-accepted", ({ from, to, roomId }) => {
    io.to(to).emit("call-accepted", { from, roomId });
  });

  // ❌ Callee declined
  socket.on("call-declined", ({ from, to }) => {
    io.to(to).emit("call-declined", { from });
  });


  socket.on("join-room", ({ roomId, userId }) => {
    socket.join(roomId);
    console.log("User", userId, "joined room", roomId);
    socket.to(roomId).emit("user-joined", userId);
  });

  socket.on("offer", ({ roomId, sdp }) => {
    console.log(`📡 Offer received for room ${roomId}`);
    socket.to(roomId).emit("offer", {roomId, sdp });
  });

  socket.on("answer", ({ roomId, sdp }) => {
    console.log(`✅ Answer received for room ${roomId}`);
    socket.to(roomId).emit("answer", {roomId, sdp });
  });

  socket.on("ice-candidate", ({ roomId, candidate }) => {
    console.log(`🧊 ICE candidate relayed for room ${roomId}`);
    socket.to(roomId).emit("ice-candidate", {roomId, candidate });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


// Serve the main HTML file on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/newindex.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server is running on port ${PORT}`));
