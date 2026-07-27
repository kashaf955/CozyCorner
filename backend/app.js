const express = require('express');
const app = express();
app.use(express.json());
const product = require('./routes/productRoute');
const errorMiddleware = require('./middleware/error.js');
app.use('/api/v1', product);


// Error Middleware
app.use(errorMiddleware);

module.exports = app;