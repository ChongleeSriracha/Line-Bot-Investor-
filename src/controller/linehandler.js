const line = require('@line/bot-sdk');
const axios = require('axios').default;
const view = require('../view/linereply');
const { getStockOptions } = require('../routes/stockroute');
const config = require('../model/config');

// Initialize LINE SDK client
const client = new line.Client({
  channelAccessToken: config.ACCESS_TOKEN,
  channelSecret: config.SECRET_TOKEN
});

const handleEvent = async (event) => {
  if (event.type === 'message' && event.message.type === 'text') {
    const stockName = event.message.text.trim().toUpperCase();
    console.log('Handling stock request for:', stockName);

    const options = getStockOptions(stockName);

    try {
      const response = await axios.request(options);
      const stockData = response.data.body;
      console.log('API Full Response:', response.data);

      if (stockData) {
        const replyText = view.formatStockData(stockName, stockData);
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: replyText.trim()
        });
      } else {
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: view.errorMessage(stockName) // Use error message function
        });
      }
    } catch (error) {
      console.error('Error fetching stock data:', error.response ? error.response.data : error.message);
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: view.generalErrorMessage(stockName) // Use general error message function
      });
    }
  } else {
    console.log('Unhandled event type:', event.type);
    return Promise.resolve(null);
  }
};

module.exports = { handleEvent };
