import express from 'express';
import redis_client from '../../middlewares/redis';
import { getTrendWords } from '../../middlewares/bigquery';


const router = express.Router();

router.get('/trend/:since/:until/:word', (req,res)=>{

  const cache_key = req.url;
  const TTL = 10*60; // 10 minutes
  
  
  redis_client.get(cache_key, function(err, data){
    if (data){
      console.log(`Cached with key = ${cache_key}`);
      return res.json(JSON.parse(data));
    }
    else {
      console.log("Not Cached");
      const start_date = req.params.since;
      const end_date = req.params.until;
      const word = req.params.word;
      
      getTrendWords(start_date, end_date, word).then((result) => {
        redis_client.setex(cache_key, TTL, JSON.stringify(result));
        return res.json(result);
      }, (err) => {
        return res.json({success:false, error: err});
      });
      
    }

  })
})

module.exports = router;