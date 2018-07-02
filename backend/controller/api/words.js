import express from 'express';
import chalk from 'chalk';
import redisClient from '../../services/redis';
import { getWords } from '../../services/bigquery';
const router = express.Router();

const LOG_ROOT = `${chalk.black.bgGreen(' API - ')}${chalk.black.bgGreen('Words ')}`;


router.get('/words/:since/:until', (req, res) => {
  const CACHE_KEY = req.url;
  const TTL_10_MINUTES = 10*60; // 10 minutes
  const LIMIT = (req.query.limit) ? req.query.limit : 15;
  
  redisClient.get(CACHE_KEY, (err, data) => {
    if (data) {
      console.log(`Cached with key = ${CACHE_KEY}`);
      return res.json(JSON.parse(data));
    } else {
      console.log(`${LOG_ROOT} Not Cached`);
      const startDate = req.params.since;
      const endDate = req.params.until;
      
      getWords(startDate, endDate, LIMIT).then((result) => {
        redisClient.setex(CACHE_KEY, TTL_10_MINUTES, JSON.stringify(result));
        console.log(`${LOG_ROOT} Successfully cached with key = ${CACHE_KEY}`);
        return res.json(result);
      }, err => res.json({success: false, error: err}) );
    }
  });
});

export default router;