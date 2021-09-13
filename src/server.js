"use strict";


const uuid = require("uuid").v4; // random uuid

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
const { getAll, received, addToQueue } = require("./messageQueue.js");

const authRoutes = require("./routes/authRoutes.js");
const v2Routes = require("./routes/v2.js");
const extra = require("./routes/extra");
// Prepare the express app
const app = express();

// io.use(bearerIo);

// setting up socket.io
io.on("connection", (socket) => {
  console.log("new user connected");

  let roomId = socket.handshake.auth.roomId;
  socket.join(roomId);

  // retrive All missed messages
  socket.on("getPrevMessages", (email) => {
    const messagesArray = getAll(email);

  });

  // adding new message to queue
  socket.on("newMessage", (payload) => {
    addToQueue(payload);
  });

  // send incoming message to all room members
  io.sockets
    .in(roomId)
    .emit("IncomingMessage", `what is going on, party people? ${roomId}`);

  // listning for recieved messages to delete
  socket.on("messageRecieved", (email) => {
    received(email);
  });
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
app.use("/api/v3", extra);


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
};
