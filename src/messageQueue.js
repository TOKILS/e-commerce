"use strict";

require("dotenv").config();
const ioClient = require("socket.io-client");
const socket = ioClient.connect(`http://localhost:${process.env.IOPORT}`);

const queue = {
  emails: {},
};

function getAll() {
  //this should return all the messages with specific email
  Object.keys(queue.emails).forEach((email) => {
    // redirect to printAllmessages to trigger the showed event n times
    socket.emit("printAllmessages", {
      email: email,
      message: queue.emails[email],
    });
  });
}

function received(email) {
  //this will delete the message from the queue
  console.log(`Message deleted from Queue . . .`);
  delete queue.emails[email];
}

function addToQueue(payload) {
  //this will add each new message to the queue
  console.log(
    `added to queue 😲 ${payload.email}, order ID: ${payload.message}`
  );
  queue.emails[payload.email] = payload.message;
}

module.exports = {
  getAll,
  received,
  addToQueue,
};
