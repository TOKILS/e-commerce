"use strict";

require("dotenv").config();

const { db } = require("./src/modules/index.js");

db.sync()
  .then(() => {
    require('./src/server')
    require("./src/ticketing/socketServer");
    require('./src/notification/notify-server')
  })
  .catch(console.error);
