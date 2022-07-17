require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./src/");
const { Server } = require('socket.io');
const http = require('http');

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

io.on('connection', (socket) => {
    console.log('socket connected', socket.id);
});
server.listen(3000, () => console.log("Socket Server running"));