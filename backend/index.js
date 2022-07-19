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
app.use(express.json());
app.use("/api/user", userRouter);
// app.listen(3000, () => console.log("Server running"));

const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};
function getConnectedUsers(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}


io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on("join", ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const users = getConnectedUsers(roomId);
        users.forEach(({ socketId }) => {
            io.to(socketId).emit("joined", {
                users,
                username,
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



    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit("disconnected", {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});
server.listen(3000, () => console.log("Socket Server running"));

