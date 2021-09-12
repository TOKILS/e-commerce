"use strict";

console.log("Client is Running ...");
require("dotenv").config();
const ioClient = require("socket.io-client");
const socket = ioClient.connect(`http://localhost:${process.env.IOPORT}`, {
  auth: { email: "kztahat96@gmail.com" },
});
