import nodemailer from 'nodemailer';
import config from '../config';

// === Send email function
async function sendMailNotif(email_dest, subject, content){
  const my_email = config.NODE_MAILER.sender_email;
  const my_pass = config.NODE_MAILER.sender_password;
  const service = config.NODE_MAILER.service;

  const transporter = nodemailer.createTransport({
    service: `${service}`,
    auth:{
      user: `${my_email}`,
      pass: `${my_pass}`
    }
  });

  var mailOptions = {
    from: `${my_email}`,
    to: `${email_dest}`,
    subject: `${subject}`,
    text: `${content}`
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error){
      console.log(`[EMAIL ERROR] : `);
      throw error;
    } else {
      console.log('Email sent: '+ info.response);
    }
  });
}
// =====

module.exports = {
  sendMail
}