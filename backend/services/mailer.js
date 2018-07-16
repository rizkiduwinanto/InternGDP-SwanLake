import nodemailer from 'nodemailer';
import chalk from 'chalk';
import config from '../config';
import redisClient from './redis';
import { promisify } from 'util';
import io from './socket';


const LOG_ROOT = `${chalk.black.bgWhite(' SERVICE - ')}${chalk.black.bgWhite('MAILER ')}`;
const MAIL_KEYWORDS = 'mail_keywords';


export function checkAndSendKeywordNotification(paragraph) {
  let lowerParagraph = paragraph.toLowerCase();
  var deleteBBTAG = new RegExp('\\[.*?\\]|\n+','g');
  var deleteTrailingSpace = new RegExp('[ ]+[ ]','g');
  var trimInitLastSpace = new RegExp('^ +| +$', 'g');

  let cleanParagraph = (lowerParagraph.replace(deleteBBTAG, ' '))
                      .replace(deleteTrailingSpace, ' ')
                      .replace(trimInitLastSpace,'');

  // console.log(cleanParagraph);
  let setOfWordsInParagraph = new Set(cleanParagraph.split(' '))
  console.log(`Size set : ${setOfWordsInParagraph.size}`);

  redisClient.hgetall(MAIL_KEYWORDS, async (err, keywords) => {
    if (err) throw err;
    if (keywords) {
      for (var keyword in keywords) {
        if (setOfWordsInParagraph.has(keyword.toLowerCase())) {
          let parsedResult = JSON.parse(keywords[keyword]);
          let TTL = parsedResult['TTL'];
          let interval = parsedResult['interval'];

          console.log(`${keyword} TTL : ${TTL}, interval ${interval}`);
          if (TTL <= 0) {
            console.log("Sending email ...");
            TTL = interval;
            const KEYWORD_MAIL_ADDR = 'keyword_mail_addr';
            const EMAIL_FIELD = 'email'; 
            const hgetAsync = promisify(redisClient.hget).bind(redisClient);
            const getEmailAddress = () => hgetAsync(KEYWORD_MAIL_ADDR, EMAIL_FIELD).then((result) => result);
            const emailAddress = await getEmailAddress();
            sendMailNotif(
                  emailAddress,
                 `[Keyword Alert] ${keyword}`,
                 `Keyword ${keyword} telah ditemukan ${interval} kali.`);
      
          } else {
            TTL = TTL - 1;
          } 
    
          let newValue = {
            TTL: TTL,
            interval: interval
          }
          
          redisClient.hset(MAIL_KEYWORDS, keyword, JSON.stringify(newValue));
        } 
      }
    }
  });
    
}

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
      let log_data =`${subject} sent at ${new Date()}`;
      // console.log(`Log data : ${log_data}`);
      io.emit(`mail`,log_data);
    }
  });
}
// =====
