require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./src/");
const { Server } = require("socket.io");
const http = require("http");

// mongodDB online -> use Atlas
const DB_CONNECT = process.env.DB_CONNECT || "";
mongoose.connect(DB_CONNECT, (err) => {
  if (err) console.log(err);
  else console.log("Connected to RemoteDB");
});

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/user", userRouter);
// app.listen(3000, () => console.log("Server running"));

const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};
const profilePicMap = {};
function getConnectedUsers(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
        profilePic: profilePicMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on("join", ({ roomId, username, profilePic }) => {
    userSocketMap[socket.id] = username;
    profilePicMap[socket.id] = profilePic;

    socket.join(roomId);
    const users = getConnectedUsers(roomId);
    users.forEach(({ socketId }) => {
      io.to(socketId).emit("joined", {
        users,
        username,
        profilePic,
        socketId: socket.id,
      });
    });
  });

  socket.on("codeChange", ({ roomId, code }) => {
    socket.in(roomId).emit("codeChange", { code });
  });

  socket.on("codeSocket", ({ socketId, code }) => {
    io.to(socketId).emit("codeChange", { code });
  });

  socket.on("fileChange", ({ roomId, fileName }) => {
    socket.in(roomId).emit("fileChange", { fileName });
  });

  socket.on("codeSocket", ({ socketId, fileName }) => {
    io.to(socketId).emit("fileChange", { fileName });
  });

  socket.on("fileIdChange", ({ roomId, fileId }) => {
    socket.in(roomId).emit("fileIdChange", { fileId });
  });

  socket.on("codeSocket", ({ socketId, fileId }) => {
    io.to(socketId).emit("fileIdChange", { fileId });
  });

  socket.on("userIdChange", ({ roomId, user_id }) => {
    socket.in(roomId).emit("userIdChange", { user_id });
  });

  socket.on("codeSocket", ({ socketId, user_id }) => {
    io.to(socketId).emit("userIdChange", { user_id });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit("disconnected", {
        socketId: socket.id,
        username: userSocketMap[socket.id],
        profilePic: profilePicMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    delete profilePicMap[socket.id];
    socket.leave();
  });
});
server.listen(3000, () => console.log("Socket Server running"));
