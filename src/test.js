const line = require('@line/bot-sdk');
const express = require("express");
const axios = require('axios').default;
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from the .env file

const app = express();

const lineConfig = {
    channelAccessToken: process.env.ACCESS_TOKEN,
    channelSecret: process.env.SECRET_TOKEN
};

// Initialize LINE SDK client
const client = new line.Client(lineConfig);

app.post('/webhook', line.middleware(lineConfig), async (req, res) => {
  try {
    const events = req.body.events;
    console.log('Received events:', events);

    if (events.length > 0) {
      await Promise.all(events.map(item => handleEvent(item)));
      return res.status(200).send("OK");
    } else {
      return res.status(200).send("No events");
    }
  } catch (error) {
    console.error('Error handling webhook:', error);
    return res.status(500).end();
  }
});

const handleEvent = async (event) => {
    // Check if the event is a message event
    if (event.type === 'message' && event.message.type === 'text') {
      const stockName = event.message.text.trim().toUpperCase(); // Extract stock name from user message
      console.log('Handling stock request for:', stockName);
  
      // Fetch stock data from API
      const options = {
        method: 'GET',
        url: 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/modules',
        params: {
          ticker: stockName, // Use the stock name as ticker
          module: 'financial-data'
        },
        headers: {
          'x-rapidapi-key': 'a5cf3e5f4cmshc9a84ffb53ebb39p10e79bjsnea416123bcaf',
          'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
        }
      };
  
      try {
        const response = await axios.request(options);
        const stockData = response.data.body;  // Update this to reflect the correct structure
  
        // Debug: Log the full API response to inspect the structure
        console.log('API Full Response:', response.data);
  
        if (stockData) {
          // Prepare a message with the requested fields
          const replyText = `
  Stock: ${stockName}
  Current Price: ${stockData.currentPrice.fmt}
  Target High Price: ${stockData.targetHighPrice.fmt}
  Target Low Price: ${stockData.targetLowPrice.fmt}
  Revenue Per Share: ${stockData.revenuePerShare.fmt}
  Return on Assets: ${stockData.returnOnAssets.fmt}
  Return on Equity: ${stockData.returnOnEquity.fmt}
  Free Cashflow: ${stockData.freeCashflow.fmt}
  Operating Cashflow: ${stockData.operatingCashflow.fmt}
  Gross Margins: ${stockData.grossMargins.fmt}
  Profit Margins: ${stockData.profitMargins.fmt}
          `;
  
          // Reply with the formatted message
          return client.replyMessage(event.replyToken, {
            type: 'text',
            text: replyText.trim()
          });
        } else {
          return client.replyMessage(event.replyToken, {
            type: 'text',
            text: `Sorry, I couldn't retrieve data for ${stockName}. Please make sure the ticker is valid.`
          });
        }
      } catch (error) {
        console.error('Error fetching stock data:', error.response ? error.response.data : error.message);
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: `An error occurred while fetching data for ${stockName}.`
        });
      }
    } else {
      console.log('Unhandled event type:', event.type);
      return Promise.resolve(null); // In case of non-message events, resolve without replying
    }
  };
  

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
