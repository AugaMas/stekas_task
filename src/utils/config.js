require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoDbUri: process.env.MONGODB_URI,
};
