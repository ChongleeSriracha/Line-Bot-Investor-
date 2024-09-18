const express = require('express');
const line = require('@line/bot-sdk');
const dotenv = require('dotenv');
const { handleEvent } = require('./src/controller/linehandler');

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
      await Promise.all(events.map(event => handleEvent(event, client)));
      return res.status(200).send("OK");
    } else {
      return res.status(200).send("No events");
    }
  } catch (error) {
    console.error('Error handling webhook:', error);
    return res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
