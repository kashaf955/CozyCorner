const express = require('express');
const app = express();
app.use(express.json());
const product = require('./routes/productRoute');
const errorMiddleware = require('./middleware/error.js');
const user = require('./routes/userRoute');


app.use('/api/v1', product);
app.use('/api/v1', user);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;