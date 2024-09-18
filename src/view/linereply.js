// src/view/linereply.js

const formatStockData = (stockName, stockData) => {
    return `
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
  };
  
  const errorMessage = (stockName) => {
    return `Sorry, I couldn't retrieve data for ${stockName}. Please make sure the ticker is valid.`;
  };
  
  const generalErrorMessage = (stockName) => {
    return `An error occurred while fetching data for ${stockName}.`;
  };
  
  module.exports = { formatStockData, errorMessage, generalErrorMessage };
  