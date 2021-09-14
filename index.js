"use strict";

require("dotenv").config();

const { start } = require("./src/server");

const { db } = require("./src/modules/index.js");

db.sync()
  .then(() => {
    start(process.env.PORT || 3003);
    // require("./src/routes/socketServer");
    require('./src/notification/notify-server');
    require('./__tests__socket/server/server');
  })
  .catch(console.error);
