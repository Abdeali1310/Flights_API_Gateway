const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALT_ROUND:process.env.SALT_ROUND,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
    JWT_EXPIRY:process.env.JWT_EXPIRY,
}