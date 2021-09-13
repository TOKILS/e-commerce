"use strict";

const uuid = require("uuid").v4;
const ioClient = require("socket.io-client");
require("dotenv").config();
const roomId = uuid();
const socket = ioClient.connect(`http://localhost:${process.env.IOPORT}`, {
  auth: { roomId: roomId },
});
console.log("Client is Running ...");

socket.emit("getPrevMessages", {
  email: "kztahat96@gmail.com",
});

socket.emit("newMessage", {
  email: "kztahat96@gmail.com",
  message: "hello from khaled",
});

socket.on("IncomingMessage", (message) => {
  console.log("Incoming message:", message);
  socket.emit("messageRecieved", "kztahat96@gmail.com");
});
