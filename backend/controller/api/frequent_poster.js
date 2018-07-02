import express from 'express';
import chalk from 'chalk';
import redisClient from '../../services/redis';
import { getGlobalFrequentPoster, getPerForumFrequentPoster } from '../../services/bigquery';
const router = express.Router();

const LOG_ROOT = `${chalk.black.bgGreen(' API - ')}${chalk.black.bgGreen('FrequentPoster ')}`;


router.get('/frequent_poster/:since/:until', (req, res) => {
  const CACHE_KEY = req.url;
  const TTL_10_MINUTES = 10*60;
  const LIMIT = (req.query.limit) ? req.query.limit : 15; // Set default limit to 15
  
  redisClient.get(CACHE_KEY, (err, data) => {
    if (data) {
      console.log(`${LOG_ROOT} Cached with key = ${CACHE_KEY}`);
      return res.json(JSON.parse(data));
    } else {
      console.log(`${LOG_ROOT} Not Cached`);
      const startDate = req.params.since.split('-').join("");
      const endDate = req.params.until.split('-').join("");

      if (req.query.forum) {
        getPerForumFrequentPoster(
          startDate, 
          endDate, 
          req.query.forum, 
          LIMIT).then( result => {
            redisClient.setex(CACHE_KEY, TTL_10_MINUTES, JSON.stringify(result));
            console.log(`${LOG_ROOT} Successfully cached with key = ${CACHE_KEY}`);
            return res.json(result);
        }, err => res.json({ success: false, error: err}) );
      } else {
        getGlobalFrequentPoster(
          startDate,
          endDate,
          LIMIT).then( result => {
            redisClient.setex(CACHE_KEY, TTL_10_MINUTES, JSON.stringify(result));
            console.log(`${LOG_ROOT} Successfully cached with key = ${CACHE_KEY}`);
            return res.json(result);
        }, err => res.json({success: false, error: err}) );
      }
    }
  });

});

export default router;