import express from 'express';
import redis_client from '../../middlewares/redis';
import { getForumList } from '../../middlewares/bigquery';


const router = express.Router();

router.get('/forum_list', (req,res)=>{

  const cache_key = req.url;
  const TTL = 10*60; // 10 minutes
  
  redis_client.get(cache_key, function(err, data){
    if (data) {
      console.log(`Cached with key = ${cache_key}`);
      return res.json(JSON.parse(data));
    }
    else {
      console.log("Not Cached");

      getForumList().then((result) => {
        redis_client.setex(cache_key, TTL, JSON.stringify(result));
        console.log(result);
        return res.json(result);
      }, (err) => {
        return res.json({success:false, error: err});
      });
    }
  })

})

module.exports = router;