const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to MongoDB'))
};

module.exports = connectDatabase;
