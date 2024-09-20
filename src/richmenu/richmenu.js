// src/richmenu/richmenu.js
const line = require('@line/bot-sdk');
const fs = require('fs');
const path = require('path');
const { richMenuTemplate } = require('../view/template');
const config = require('../model/config');

// Initialize LINE SDK client
const client = new line.Client({
  channelAccessToken: config.ACCESS_TOKEN,
  channelSecret: config.SECRET_TOKEN,
});

// Create a new rich menu
const createRichMenu = async () => {
  try {
    const richMenuId = await client.createRichMenu(richMenuTemplate);
    console.log('Rich menu created with ID:', richMenuId);

    // Upload image for the rich menu
    const imagePath = path.resolve(__dirname, '../img/baemon.jpeg');
    const imageBuffer = fs.readFileSync(imagePath);

    await client.setRichMenuImage(richMenuId, imageBuffer, 'image/jpeg');  // Corrected media type
    console.log('Rich menu image uploaded');

    // Activate the rich menu
    await client.setDefaultRichMenu(richMenuId);
    console.log('Rich menu activated');

    return richMenuId;
  } catch (error) {
    console.error('Error creating rich menu:', error.response ? error.response.data : error.message);
  }
};

module.exports = { createRichMenu };
