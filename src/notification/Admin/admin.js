'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const connectionToNotify = io.connect(`http://localhost:3001/notify`);

connectionToNotify.emit('getAll')

connectionToNotify.on('forOrder', payload => {
    console.log(`You have an order : `, payload.id);
    connectionToNotify.emit('received', payload.id);
})

module.exports = connectionToNotify