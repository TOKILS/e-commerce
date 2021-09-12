"use strict";

/* this socket-io instance is the one responsible for connecting users with the support staff of the website */
const { io } = require("../../server.js");

// message model import
const { messageModel } = require("../database/index.js");

// libraries
const uuid = require("uuid").v4; // random uuid
const bearerIo = require("../middleware/bearer-io.js");

// message queue
const messageQueue = {};
/* will have:
messageQueue = { 
  sohip@hotmail.com = {
    room: "room id",
    messages: ["message 1", "message 2", "message 3", ...etc]
  },
  something@gmail.com = {...etc}
}
*/

io.use(bearerIo);

io.on("connection", bearerIo, (socket) => {

  /* when a user connects, make a room and add it with the email of the user to the object userRooms */
  let newRoomID = uuid();
  socket.join(newRoomID);
  
  // check if the user has any messages in the message queue
  if (messageQueue[socket.bearerAuthObj.email]) {
    messageQueue[socket.bearerAuthObj.email].room = newRoomID;
  } else {
    messageQueue[socket.bearerAuthObj.email] = {
      room: newRoomID,
      messages: []
    }
  }

  // front end will have a "receive-room-data" io event
  socket.emit("receive-room-data", { data: messageQueue[socket.bearerAuthObj.email] });

  /* when a front end wants to send a message it will emit to the message-send event */
  socket.on("message-send", async (payload) => {
    /* payload = {
      message: "message here",
      email: "email here",
      roomID: "uuid here",
    } */

    io.to(payload.roomID).emit("message-receive", payload.message);
    /* this event is to send the previous message to the room they're in */

    // save message to database 
    await messageModel.create(payload);
    // save message to message queue
    messageQueue[socket.bearerAuthObj.email].message.push(payload.message);
  });
});
