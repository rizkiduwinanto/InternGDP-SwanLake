module.exports = {
  API_ADDR: process.env.API_ADDR || 'localhost',
  API_PORT: process.env.API_PORT || 3001,
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  NODE_MAILER: {
    sender_email: process.env.EMAIL,
    sender_password: process.env.PASSWORD,
    service: 'gmail'
  }
};
