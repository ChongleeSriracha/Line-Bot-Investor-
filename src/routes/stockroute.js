// src/routes/stockroute.js

const config = require('../model/config'); // Import your configuration

const getStockOptions = (stockName) => {
  return {
    method: 'GET',
    url: 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/modules',
    params: {
      ticker: stockName,
      module: 'financial-data'
    },
    headers: {
      'x-rapidapi-key': config.RAPIDAPI_KEY,
      'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
    }
  };
};

module.exports = { getStockOptions };
