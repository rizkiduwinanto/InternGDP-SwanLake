module.exports = {
  API_ADDR: process.env.API_ADDR | '127.0.0.1',
  API_PORT: process.env.API_PORT | 3001,
  REDIS_HOST: process.env.REDIS_HOST | '127.0.0.1',
  NODE_MAILER: {
    sender_email: process.env.EMAIL,
    sender_password: process.env.PASSWORD,
    service: 'gmail'
  }
};