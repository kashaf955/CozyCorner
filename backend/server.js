const path = require('path');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const connectDatabase = require('./config/database');
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
