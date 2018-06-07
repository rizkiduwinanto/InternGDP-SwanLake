import express from 'express';
import redis_client from '../../middlewares/redis';
import { getWords } from '../../middlewares/bigquery';

const router = express.Router();

router.get('/words/:since/:until', (req,res)=>{

  const cache_key = req.url;
  const TTL = 10*60; // 10 minutes
  const limit = (req.query.limit) ? req.query.limit : 15;
  
  redis_client.get(cache_key, function(err, data){
    if (data){
      console.log(`Cached with key = ${cache_key}`);
      return res.json(JSON.parse(data));
    }
    else {
      console.log("Not Cached");
      const start_date = req.params.since;
      const end_date = req.params.until;
      
      getWords(start_date, end_date, limit).then((result) => {
        redis_client.setex(cache_key, TTL, JSON.stringify(result));
        return res.json(result);
      }, (err) => {
        return res.json({success:false, error: err});
      });
      
    }

  })
})

module.exports = router;