'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');

// Esoteric Resources
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const loggerMiddleware = require('./middleware/logger');

const authRoutes = require('./routes/authRoutes.js');
const v2Routes = require('./routes/v2.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(express.json());

app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.status(200).send('Hello 👋 🖥 server')
})

app.use(authRoutes);
app.use('/api/v2', v2Routes);

// Catchalls
app.use('*', notFoundHandler);
app.use(errorHandler);

const start = PORT => {
    app.listen(PORT, () => {
        console.log(`Server is Running on Port ${PORT}`)
    })
}
module.exports = {
    server: app,
    start: start
}