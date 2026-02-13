const { io } = require("socket.io-client");
const readline = require("readline");

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your name: ", (username) => {
  socket.emit("join", username);

  socket.on("alone", () => {
    console.log("You are the Only One In the room.");
  });

  socket.on("userJoined", (name) => {
    console.log(`${name} joined`);
  });

  socket.on("message", (data) => {
    console.log(`${data.username} : ${data.msg}`);
  });

  console.log("Type Message ..");

  rl.on("line", (input) => {
    socket.emit("chatMessage", input);
  });
});
