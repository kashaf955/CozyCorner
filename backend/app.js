const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const product = require('./routes/productRoute');
const errorMiddleware = require('./middleware/error.js');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute.js');

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
// Error Middleware
app.use(errorMiddleware);

module.exports = app;