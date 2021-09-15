'use strict';

require('dotenv').config();
const { io } = require("../server");
const notify = io.of('/notify');

const messagesQueue = {
    orderQueue: {},
};


notify.on('connection', socket => {

    socket.on('Order', (payload) => {
        console.log('EVENT:', {
            event: 'Order',
            time: new Date().toLocaleString(),
            payload: payload,
        });
        const id = payload.id;
        messagesQueue.orderQueue[id] = payload;
        notify.emit('forOrder', { id, payload: messagesQueue.orderQueue.id });
    });

    socket.on('getAll', () => {
        console.log('send all order to the Admin when connected');
        Object.keys(messagesQueue.orderQueue).forEach(id => {
            socket.emit('forOrder', { id, payload: messagesQueue.orderQueue[id] });
        });
    });

    socket.on('received', id => {
        delete messagesQueue.orderQueue[id];
    });

});