const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let users = {};

io.on("connection", (socket) => {
  socket.on("join", (username) => {
    users[socket.id] = username;
    console.log(`${username} Joined with Socket- ID :- ${socket.id}`);
    const totalUsers = Object.keys(users).length;

    if (totalUsers === 1) {
      socket.emit("alone");
    } else {
      socket.broadcast.emit("userJoined", username);
    }
  });

  socket.on("chatMessage", (msg) => {
    const username = users[socket.id];

    socket.broadcast.emit("message", {
      username,
      msg,
    });
  });

  socket.on("disconnect", () => {
    const username = users[socket.id];
    delete users[socket.id];

    if (username) {
      console.log(`${username} Disconnected with Socket- ID :- ${socket.id}`);
      socket.broadcast.emit("message", {
        username: "System",
        msg: `${username} left the chat`,
      });
    }
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
