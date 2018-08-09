import nodemailer from 'nodemailer';
import chalk from 'chalk';
import config from '../config';
import redisClient from './redis';
import { promisify } from 'util';
import getIO from './socket';


const LOG_ROOT = `${chalk.black.bgWhite(' SERVICE - ')}${chalk.black.bgWhite('MAILER ')}`;
const MAIL_KEYWORDS = 'mail_keywords';


function getSentence(paragraph, word) {
  const nbWordInSentence = 7;
  let listOfWordsFromParagraph = paragraph.split(' ');
  
  let idxWordInSentence = listOfWordsFromParagraph.indexOf(word.toLowerCase());
  listOfWordsFromParagraph[idxWordInSentence] = "<b>"+word+"</b>";
  if (listOfWordsFromParagraph.length <= nbWordInSentence) return listOfWordsFromParagraph.join(' ');

  // In Middle  ... word1 word2 word3 word word4 word5 word6 ...
  let leftTreshold = idxWordInSentence - Math.floor(nbWordInSentence/2);
  let rightTreshold = idxWordInSentence + Math.floor(nbWordInSentence/2);
  let body;

  if (0 <= leftTreshold && rightTreshold < listOfWordsFromParagraph.length) {
    body = listOfWordsFromParagraph.slice(leftTreshold,rightTreshold+1).join(' ');
    return "... "+body+" ...";
  } else if (leftTreshold < 0) {
    // In front word word1 word2 word3 word4 word5 word6 ...
    body = listOfWordsFromParagraph.slice(0,nbWordInSentence).join(' ');
    return body+" ...";

  } else { // rightTreshold > listOfWordsFromParagraph.length
    // In back word word1 word2 word3 word4 word5 word6 word
    let startIdx =  listOfWordsFromParagraph.length - nbWordInSentence;
    body = listOfWordsFromParagraph.slice(startIdx,listOfWordsFromParagraph.length).join(' ');
    return "... "+body;
  } 
}

function getBody(keyword, hmap) {
  let body = `<h4>Keyword ${keyword} telah ditemukan sebanyak ${Object.keys(hmap).length}</h4>`;
  let list = '<ul>';
  for (var key in hmap ){
    if (hmap.hasOwnProperty(key)){
      let url = `https://www.kaskus.co.id/show_post/${key}`;
      list = list + `<li><a href="${url}">${hmap[key]}</a></li>`;
    }
  }
  body = body + list + '</ul>';
  return body;
}


export function checkAndSendKeywordNotification(paragraph, post_id) {
  let lowerParagraph = paragraph.toLowerCase();
  var deleteBBTAG = new RegExp('\\[.*?\\]|\n+','g');
  var deleteTrailingSpace = new RegExp('[ ]+[ ]','g');
  var trimInitLastSpace = new RegExp('^ +| +$', 'g');

  let cleanParagraph = (lowerParagraph.replace(deleteBBTAG, ' '))
                      .replace(deleteTrailingSpace, ' ')
                      .replace(trimInitLastSpace,'');

  // console.log(cleanParagraph);
  let setOfWordsInParagraph = new Set(cleanParagraph.split(' '));
  // console.log(`Size set : ${setOfWordsInParagraph.size}`);

  redisClient.hgetall(MAIL_KEYWORDS, async (err, keywords) => {
    if (err) throw err;
    if (keywords) {
      for (var keyword in keywords) {
        if (setOfWordsInParagraph.has(keyword.toLowerCase())) {
          let parsedResult = JSON.parse(keywords[keyword]);
          let interval = parsedResult['interval'];
          let hmap = parsedResult['urls'];

          if (Object.keys(hmap).length && post_id in hmap) return;
          // console.log(`Got new url for ${keyword}`);

          let sentence = getSentence(cleanParagraph, keyword);
          hmap[post_id] = sentence;

          let newValue;
          if (Object.keys(hmap).length == interval) {
            console.log("Sending email ...");
            const KEYWORD_MAIL_ADDR = 'keyword_mail_addr';
            const EMAIL_FIELD = 'email'; 
            const hgetAsync = promisify(redisClient.hget).bind(redisClient);
            const getEmailAddress = () => hgetAsync(KEYWORD_MAIL_ADDR, EMAIL_FIELD).then((result) => result);
            const emailAddress = await getEmailAddress();
              sendMailNotif(
                emailAddress,
                `[Keyword Alert] ${keyword}`,
                getBody(keyword, hmap));

            newValue = {
              interval: interval,
              urls: {}
            }

          } else {
            newValue = {
              interval: interval,
              urls: hmap
            }

          }
    
          
          redisClient.hset(MAIL_KEYWORDS, keyword, JSON.stringify(newValue));
        } 
      }
    }
  });
    
}

// === Send email function
export async function sendMailNotif(destEmail, subject, content){
  try {

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
      html: `${content}`
    }
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`${LOG_ROOT} : `, error);
      } else {
        // console.log(`${LOG_ROOT} sent: ${info.response}`);
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' ,hour:'numeric',minute:'numeric'};
        let log_data =`${subject} sent at ${(new Date()).toLocaleString("en-us",options)}`;
        // console.log(`Log data : ${log_data}`);
        getIO().emit(`mail`,log_data);
      }
    });
  } catch (err) {
    console.log(err);
  }
}
  // =====
