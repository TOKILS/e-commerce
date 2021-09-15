'use strict';

console.log("server started");

require('dotenv').config();
const { io } = require("../server");
const uuid = require("uuid").v4; // random uuid

const openRooms = [];
const messageQueue = {};
/*
messageQueue : {
  roomid : {
    messages: [
      {
        message: "message here",
        email: "email here",
        messageSender: "user"
      },
      {
        message: "message here",
        email: "email here",
        messageSender: "admin"
      },
      
    ]
  }
}
*/
const emailLastRoomInfo = {};
/*
  emailLastRoomInfo : {
    emailHere: {
      email: "email here",
      lastRoomId = "id here"
    },
  }
*/

io.on("connection", (socket) => {
  console.log(`${socket.id} connected to the server`);
  /* when a user connects, make a room and add it with the email of the user to the object userRooms */

  socket.on("join-room", (payload) => {
    /* 
    payload : {
      email: "email here",
      issue: "issue here"
    } 
    */

    console.log(`${payload.email} requested join-room event`);
    let newRoomID = uuid();
    socket.join(newRoomID);

    socket.infoObj = {
      email: payload.email,
      room: newRoomID,
    };
    messageQueue[socket.infoObj.room] = {
      messages: [],
    }
    for (let i = 0; i < openRooms.length; i++) {
      if (openRooms[i].email === socket.infoObj.email) {
        openRooms.splice([i], 1);
      }
    }
    openRooms.push({ email: payload.email, room: newRoomID, issue: payload.issue });
    // check if the user has any messages in the message queue
    let emailFromObj = emailLastRoomInfo[payload.email];
    if (emailFromObj) {
      /*
      emailLastRoomInfo : {
        emailHere: {
          email: "email here",
          lastRoomId = "id here"
        },
      }
      */
      // emailFromObj.room = newRoomID;

      let messagesFromQ = messageQueue[emailFromObj.lastRoomId].messages;
      emailLastRoomInfo[payload.email] = {
        email: payload.email,
        lastRoomId: newRoomID,
      }
      socket.emit("receive-old-messages", { messages: messagesFromQ });
    } else {
      emailLastRoomInfo[payload.email] = {
        email: payload.email,
        lastRoomId: newRoomID,
      };
    }

    socket.emit("info", { message: `you are now connected to room ${newRoomID}`, messageType: "systemMessages", drawMessage: "true" });
    io.emit("receive-all-rooms", openRooms);
  });


  /* when a front end wants to send a message it will emit to the message-send event */
  socket.on("send-message", async (payload) => {
    /* payload = {
      message: "message here",
    } */
    if (socket.infoObj) {
      socket.to(socket.infoObj.room).emit("receive-message", { message: payload.message, messageType: "forMeMessages", drawMessage: "true" });
      /* this event is to send the previous message to the room they're in */

      // save message to database
      // await messageModel.create(payload);
      // save message to message queue
      messageQueue[socket.infoObj.room].messages.push({ message: payload.message, email: socket.infoObj.email, messageSender: payload.messageSender });
    } else {
      socket.emit("receive-message", { message: "please enter your email", messageType: "systemMessages", drawMessage: "false" });
    }
  });

  socket.on("disconnect", (payload) => {
    if (socket.infoObj) {
      for (let i = 0; i < openRooms.length; i++) {
        if (openRooms[i].email === String(socket.infoObj.email)) {
          io.sockets.in(openRooms[i].room).emit("info", { message: `you are now not connected to any room`, messageType: "systemMessages", drawMessage: "true" });

          openRooms.splice([i], 1);
        }
      }
      io.emit("receive-all-rooms", openRooms);
    }
  });

  // ! support section
  socket.on("support-join-room", (payload) => {
    console.log(`${payload.email} requested join-room event`);
    let newRoomID = uuid();
    socket.join(newRoomID);

    socket.infoObj = {
      email: payload.email,
      room: newRoomID,
    };

    for (let i = 0; i < openRooms.length; i++) {
      if (openRooms[i].email === socket.infoObj.email) {
        openRooms.splice([i], 1);
      }
    }
    // openRooms.push({ email: payload.email, room: newRoomID });
    // check if the user has any messages in the message queue
    if (messageQueue[payload.email]) {
      messageQueue[payload.email].room = newRoomID;
      let messageFromQ = messageQueue[payload.email].messages;
      socket.emit("receive-old-messages", { messages: messageFromQ });
    } else {
      messageQueue[payload.email] = {
        room: newRoomID,
        messages: [],
      };
    }

    socket.emit("info", { message: `Please select a Room `, messageType: "systemMessages", drawMessage: "true" });
  });

  socket.on("join-specific-room", (payload) => {
    socket.leave(socket.infoObj.room);
    socket.join(payload.room);
    socket.infoObj.room = payload.room;

    let messagesFromQ = messageQueue[payload.room].messages;

    socket.emit("receive-old-messages", { messages: messagesFromQ });

    socket.emit("info", { message: `you are now connected to room ${payload.room}`, messageType: "systemMessages", drawMessage: "true" });
  });
  socket.on("request-all-rooms", (payload) => {
    console.log(`open rooms vvvv`);
    console.log(openRooms);
    socket.emit("receive-all-rooms", openRooms);
  });

  socket.on("close-specific-room", (payload) => {
    for (let i = 0; i < openRooms.length; i++) {
      if (openRooms[i].email === String(payload.email)) {
        io.sockets.in(openRooms[i].room).emit("info", { message: `you are now not connected to any room`, messageType: "systemMessages", drawMessage: "true" });
        io.socketsLeave(openRooms[i].room);
        openRooms.splice([i], 1);
        break
      }
    }
  });
});
