// src/view/template.js

const richMenuTemplate = {
    size: { width: 2500, height: 843 },
    selected: false,
    name: "Nice Richmenu",
    chatBarText: "Tap here",
    areas: [
      {
        bounds: { x: 0, y: 0, width: 833, height: 843 },
        action: { type: "message", text: "Stock" },
      },
      {
        bounds: { x: 834, y: 0, width: 833, height: 843 },
        action: { type: "message", text: "News" },
      },
      {
        bounds: { x: 1667, y: 0, width: 833, height: 843 },
        action: { type: "uri", uri: "https://example.com" },
      },
    ],
  };
  
  module.exports = { richMenuTemplate };
  