'use strict';

require('dotenv').config();

const { start } = require('./src/server');

const { db } = require('./src/models/index');


db.sync()
    .then(() => {
        start(process.env.PORT || 3003);
    }).catch(console.error);