const { io } = require("../server");
const uuid = require("uuid").v4; // random uuid
const bearerIo = require("../middleware/bearer-io");
const { message: messageModel } = require("../modules/index");
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

// ! io.on("connection", bearerIo, (socket) => {
io.on("connection", (socket) => {
  console.log("client conndected", socket.remoteAddress);
  /* when a user connects, make a room and add it with the email of the user to the object userRooms */
  socket.on("help", (payload) => {
    console.log("client need help", payload.email);

    let newRoomID = uuid();
    socket.join(newRoomID);

    // check if the user has any messages in the message queue
    if (messageQueue[payload.email]) {
      messageQueue[payload.email].room = newRoomID;
      // front end will have a io.on(user email) event           "receive-room-data" io event
      io.emit(payload.email, {
        data: messageQueue[payload.email],
      });
    } else {
      messageQueue[payload.email] = {
        room: newRoomID,
        messages: [],
      };
    }

    /* when a front end wants to send a message it will emit to the message-send event */
    // socket.on("message-send", async (payload) => {
    socket.on(payload.email, async (userMessage) => {
      /* payload = {
        message: "message here",
        email: "email here",
        roomID: "uuid here",
      } */

      io.to(userMessage.roomID).emit(payload.email, userMessage.message);
      /* this event is to send the previous message to the room they're in */

      // save message to database
      await messageModel.create(userMessage);
      // save message to message queue
      messageQueue[payload.email].message.push(userMessage);
    });
  });
});
