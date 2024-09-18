require('dotenv').config(); // Load environment variables from .env file

const config = {
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  SECRET_TOKEN: process.env.SECRET_TOKEN,
  RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
};

module.exports = config;
