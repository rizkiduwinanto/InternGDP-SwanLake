module.exports = {
  API_PORT: process.env.API_PORT | 3001,
  NODE_MAILER: {
    sender_email: process.env.EMAIL,
    sender_password: process.env.PASSWORD,
    service: 'gmail'
  }
};