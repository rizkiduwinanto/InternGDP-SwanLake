import express from 'express';
import chalk from 'chalk';
import redisClient from '../../services/redis';
const router = express.Router();

const LOG_ROOT = `${chalk.black.bgGreen(' API - ')}${chalk.black.bgGreen('KEYWORD MAIL ADDR ')}`;
const KEYWORD_MAIL_ADDR = 'keyword_mail_addr';
const EMAIL_FIELD = 'email';

router.get('/keyword_mail_addr', (req, res) => {

  redisClient.hget(KEYWORD_MAIL_ADDR, EMAIL_FIELD, (err, emailAddress) => {
    if (err) throw err;
    if (!emailAddress) {
      res.json({ [EMAIL_FIELD]: 'empty'});
    } else{
      console.log(emailAddress);
      res.json({ [EMAIL_FIELD]: emailAddress});
    }
  });

})


router.patch('/keyword_mail_addr', (req, res) => {

  const { email } = req.body;
  redisClient.hset(KEYWORD_MAIL_ADDR, EMAIL_FIELD, email);

  res.json({success: true});
})


export default router;