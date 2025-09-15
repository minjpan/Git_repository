const stockService = require('./services/stockService');
const alertService = require('./services/alertService');
const emailService = require('./services/emailService');
const logger = require('./utils/logger');
const cron = require('node-cron');
const fs = require('fs').promises;
const path = require('path');

async function loadTickers() {
  try {
     const data = await fs.readFile(path.join(__dirname, 'config/tickers.json'));
    return JSON.parse(data).tickers;
  } catch (error) {
    logger.error(`Error loading tickers: ${error.message}`);
    return [];
  }
}

async function checkStocks() {
    try {
        const alerts = [];
    for (const ticker of tickers) {
      const data = await stockService.getStockData(ticker);
      if (!data) {
        logger.error(`No data for ${ticker}`);
        continue;
      } 

      const alertMessage = alertService.checkAlertCondition(data, ticker);
      if (alertMessage) {
        alerts.push(alertMessage);
        logger.info(`Alert triggered: ${alertMessage}`);
      } else {
        logger.info(`No alert for ${ticker}`);
      }
    }

    if (alerts.length > 0) {
      const subject = '주식 60일 이동평균선 알람';
      const text = alerts.join('\n\n');
      await emailService.sendEmail({ subject, text });
      logger.info('Email sent with alerts');
    } else {
      logger.info('No alerts triggered for any tickers');
    }
  } catch (error) {
    logger.error(`Check stocks error: ${error.message}`);
  }
}

// 5분마다 실행 (실시간 모니터링)
cron.schedule('*/5 * * * *', () => {
  logger.info('Running scheduled stock check');
  checkStocks();
});

// 초기 실행
checkStocks();
