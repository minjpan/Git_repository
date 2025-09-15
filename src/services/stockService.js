const yahooFinance = require('yahoo-finance2').default;
const logger = require('../utils/logger');

async function getStockData(ticker, days = 60) {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - (days + 30)); // 여유분 포함

    const queryOptions = { period1: startDate, period2: endDate };
    const result = await yahooFinance.historical(ticker, queryOptions);

    if (!result || result.length < days) {
      logger.error(`Insufficient data for ${ticker}`);
      return null;
    }

    // 최신 60일 데이터로 이동평균 계산
    const closes = result.map(row => row.close);
    const ma60 = closes.slice(-days).reduce((sum, val) => sum + val, 0) / days;
    const latestPrice = closes[closes.length - 1];

    return { latestPrice, ma60 };
  } catch (error) {
    logger.error(`Error fetching stock data for ${ticker}: ${error.message}`);
    return null;
  }
}

module.exports = { getStockData };