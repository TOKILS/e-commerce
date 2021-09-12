"use strict";

const uuid = require("uuid").v4; // random uuid
const bearerIo = require("./middleware/bearer-io.js");

// 3rd Party Resources
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const io = require("socket.io")(process.env.IOPORT);

// Esoteric Resources
const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
const loggerMiddleware = require("./middleware/logger");

const authRoutes = require("./routes/authRoutes.js");
const v2Routes = require("./routes/v2.js");
const { message } = require("./modules/index.js"); // message Model Class

// Prepare the express app
const app = express();

// Message Queue
const messageQueue = {};
io.use(bearerIo);

// setting up socket.io
io.on("connection", (socket) => {
  console.log("new user connected");
  console.log("socket id : ", socket.id);

  socket.on("recieveMessage", (message) => {});

  // /* when a user connects, make a room and add it with the email of the user to the object userRooms */
  // let newRoomID = uuid();
  // socket.join(newRoomID);

  // // check if the user has any messages in the message queue
  // if (messageQueue[socket.bearerAuthObj.email]) {
  //   messageQueue[socket.bearerAuthObj.email].roomId = newRoomID;
  // } else {
  //   messageQueue[socket.bearerAuthObj.email] = {
  //     roomId: newRoomID,
  //     messages: [],
  //   };
  // }

  // // front end will have a "receive-room-data" io event
  // socket.emit("receive-room-data", {
  //   data: messageQueue[socket.bearerAuthObj.email],
  // });

  // /* when a front end wants to send a message it will emit to the message-send event */
  // socket.on("message-send", async (payload) => {
  //   /* payload = {
  //     message: "message here",
  //     email: "email here",
  //     roomID: "uuid here",
  //   } */
  //   io.to(payload.roomId).emit("message-receive", payload.message);
  //   /* this event is to send the previous message to the room they're in */
  //   // save message to database
  //   await messageModel.create(payload);
  //   // save message to message queue
  //   messageQueue[socket.bearerAuthObj.email].message.push(payload.message);
  // });
});

// App Level MW
app.use(cors());
app.use(express.json());

app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.status(200).send("Hello 👋 🖥 server");
});

app.use(authRoutes);
app.use("/api/v2", v2Routes);

// Catchalls
app.use("*", notFoundHandler);
app.use(errorHandler);

const start = (PORT) => {
  app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`);
  });
};

module.exports = {
  server: app,
  start: start,
  // io: io,
};
