"use strict";

// 3rd Party Resources
const express = require("express");
const cors = require("cors");
require('dotenv').config();

// Esoteric Resources
const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
const loggerMiddleware = require("./middleware/logger");

const authRoutes = require("./routes/authRoutes.js");
const v2Routes = require("./routes/v2.js");
const extra = require("./routes/extra");
// Prepare the express app
const socket_io = require("socket.io");
const app = express();

var http = require('http').Server(app);
var socketio = require('socket.io')


app.set('view engine', 'ejs')
app.use(express.static('public'))

// App Level MW
app.use(cors());
app.use(express.json());

app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.status(200).send("Hello 👋 🖥 server");
});


app.get('/client', (req, res) => {

  res.sendFile(__dirname + '/ticketing/views/index.html')

})

app.get('/admin', (req, res) => {

  res.sendFile(__dirname + '/ticketing/views/admin.html')

})


app.get("/bad", (req, res, next) => {
  next("Error Bad End Point");
});

app.use(authRoutes);
app.use("/api/v2", v2Routes);
app.use("/api/v3", extra);

// Catchalls
app.use("*", notFoundHandler);
app.use(errorHandler);

const port = process.env.PORT

const server = app.listen(port, () => {
  console.log(`server is running ${port}`)

})

const io = socketio(server)


module.exports = {
  io: io,
  server: app,
};


