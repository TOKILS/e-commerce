'use strict';

require('dotenv').config();
const { io } = require("../server");

io.on('connection', socket => {
  console.log("New user connected")

  socket.username = "Anonymous"

  socket.on('join-room', (ROOM_ID, id) => {
    socket.join(ROOM_ID)
    socket.to(ROOM_ID).broadcast.emit('user-connected', id)

    socket.on('disconnect', () => {
      socket.to(ROOM_ID).broadcast.emit('user-disconnected', id)
    })
  })

  socket.on('change_username', data => {
    socket.username = data.username
  })


  //handle the new message event
  socket.on('new_message', data => {
    console.log("new message")
    io.sockets.emit('receive_message', { message: data.message, username: socket.username, type: data.type })
  })


  socket.on('typing', data => {
    socket.broadcast.emit('typing', { username: socket.username, text: data.text })
  })

})