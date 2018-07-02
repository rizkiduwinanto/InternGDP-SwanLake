import nodemailer from 'nodemailer';
import chalk from 'chalk';
import config from '../config';

const LOG_ROOT = `${chalk.black.bgWhite(' SERVICE - ')}${chalk.black.bgWhite('MAILER ')}`;

// === Send email function
export async function sendMailNotif(destEmail, subject, content){
  const SENDER_EMAIL = config.NODE_MAILER.sender_email;
  const SENDER_PASS = config.NODE_MAILER.sender_password;
  const MAIL_SERVICE = config.NODE_MAILER.service;

  if (SENDER_EMAIL == null || SENDER_PASS == null) {
    console.log(`${LOG_ROOT} : ${chalk.red(' Seems you forget to put email/pass in the env variable')}`);
    return;
  }
  const transporter = nodemailer.createTransport({
    service: `${MAIL_SERVICE}`,
    auth:{
      user: `${SENDER_EMAIL}`,
      pass: `${SENDER_PASS}`
    }
  });

  const mailOptions = {
    from: `${SENDER_EMAIL}`,
    to: `${destEmail}`,
    subject: `${subject}`,
    text: `${content}`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`${LOG_ROOT} : `);
      throw error;
    } else {
      console.log(`${LOG_ROOT} sent: ${info.response}`);
    }
  });
}
// =====
