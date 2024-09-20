const express = require("express");
const line = require('@line/bot-sdk');
const dotenv = require('dotenv');
const { createRichMenu } = require('./src/richmenu/richmenu');
const { handleEvent } = require('./src/controller/linehandler');

dotenv.config();

const app = express();

const lineConfig = {
    channelAccessToken: process.env.ACCESS_TOKEN,
    channelSecret: process.env.SECRET_TOKEN
};

// Initialize LINE SDK client
const client = new line.Client(lineConfig);

// Add webhook route
app.post('/webhook', line.middleware(lineConfig), async (req, res) => {
  try {
    const events = req.body.events;
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

// Optional: Trigger rich menu creation on server startup
createRichMenu();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
