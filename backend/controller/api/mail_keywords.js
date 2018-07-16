import express from 'express';
import chalk from 'chalk';
import redisClient from '../../services/redis';
import _ from 'lodash';
const router = express.Router();

const LOG_ROOT = `${chalk.black.bgGreen(' API - ')}${chalk.black.bgGreen('MAIL KEYWORD ')}`;
const MAIL_KEYWORDS = 'mail_keywords';

router.get('/mail_keywords', (req, res) => {

  redisClient.hgetall(MAIL_KEYWORDS, (err, keywords) => {
    if (err) throw err;
    if (!keywords) {
      res.json({ success: false, message: "Empty Set" });
    } else{
      var listOfKeywords = _.transform(keywords, (res, value, key) => {
        let parsedValue = JSON.parse(value);
        let interval = parsedValue['interval'];
        
        res.push({keyword:key, interval });
      }, []);
      res.json(listOfKeywords);
    }
  });

})

router.post('/mail_keywords', (req, res) => {
  const { keyword, interval } = req.body;
  let value = {
    TTL: interval,
    interval: interval
  }
  redisClient.hset(MAIL_KEYWORDS, keyword, JSON.stringify(value));

  res.json({success: true});
})

router.patch('/mail_keywords', (req, res) => {

  const { keyword, interval } = req.body;
  let value = {
    TTL: interval,
    interval: interval
  }
  redisClient.hset(MAIL_KEYWORDS, keyword, JSON.stringify(value));

  res.json({success: true});
})

router.delete('/mail_keywords', (req, res) => {

  const { keyword } = req.body;
  redisClient.hdel(MAIL_KEYWORDS, keyword);

  res.json({success: true});
})

export default router;