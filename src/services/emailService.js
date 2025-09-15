const nodemailer = require('nodemailer');
const logger = require('../utils/logger');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail({ subject, text }) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject,
      text,
    });
    logger.info('Email sent successfully');
  } catch (error) {
    logger.error(`Email error: ${error.message}`);
  }
}

module.exports = { sendEmail };