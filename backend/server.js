import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import redis from 'redis';
import BigQuery from '@google-cloud/bigquery';
      
const app = express();
const router = express.Router();

const bigquery = new BigQuery();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;

// now we should configure the API to use bodyParser and look for JSON data in the request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));


// === LETS CONNECT TO REDIS ===

// Iam using default 127.0.0.1:6379
const client = redis.createClient();

client.on('connect', () => {
  console.log(`connected to redis`);

});

client.on('error', err => {
  console.log(`Error: ${err}`);
});

// ====

// === Routing Stuff ===
router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!'});
});

router.get('/frequent-poster/global/:date', (req,res) => {
  const date_key = req.url;
  console.log(`date_key = ${req.url}`);
  const TTL = 10*60; // 10 minutes

  client.get(date_key, function(err, data){
    if (data){
      console.log("Cached");
      return res.json({ success:true, data: JSON.parse(data) });
    }
    else {
      console.log("Not Cached");
      const date = req.params.date.split('-').join("");
      const table = `[kaskus-166400:intern_dataset.thread_${date}]`;

      getGlobalFrequentPoster(table, date_key, TTL).then((result) => {
        return res.json(result);
      }, (err) => {
        return res.json({success:false, error: err});
      });
    }

  });

  
})

router.get('/frequent-poster/forum/:date', (req,res) => {

  const date_key = req.url;
  console.log(`date_key = ${req.url}`);
  const TTL = 10*60; // 10 minutes

  
  client.get(date_key, function(err, data){
    if (data){
      console.log("Cached");
      return res.json({ success:true, data: JSON.parse(data) });
    }
    else {
      console.log("Not Cached");
      const date = req.params.date.split('-').join("");
      const table = `[kaskus-166400:intern_dataset.thread_${date}]`;

      getPerForumFrequentPoster(table, date_key, TTL).then((result) => {
        return res.json(result);
      }, (err) => {
        return res.json({success:false, error: err});
      });
    }

  })

  
})
  
// =======
  

// === Query Function ===
async function getPerForumFrequentPoster(table, date_key, TTL){
  
  // The SQL query to run
  const sqlQuery = `
  SELECT
  forum_id,
  post_username,
  thread_count
  FROM (
    SELECT
    forum_id,
    post_username,
    COUNT(*) AS thread_count,
    ROW_NUMBER() OVER(PARTITION BY forum_id ORDER BY thread_count DESC) AS rownum
    FROM ${table} GROUP BY
    forum_id,
    post_username
    ORDER BY
    forum_id,
    thread_count DESC,
    post_username ASC
  ) TEMP
  WHERE
  rownum = 1
  LIMIT
  1000;`;
  
  // Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query
  const options = {
    query: sqlQuery,
    useLegacySql: true, // Use Legacy SQL syntax for queries.
  };

  // Runs the query
  var to_return = await bigquery
  .query(options)
  .then(results => {
    const freq_posters = results[0];
    
    return ({
      success: true,
      data: freq_posters
    });
  })
  .catch(err => {
    return ({
      success: false,
      error: err.errors
    });
  });
  return to_return;
}

async function getGlobalFrequentPoster(table, date_key, TTL){
  // The SQL query to run
  const sqlQuery = `
  SELECT
  post_username,
  COUNT(*) AS thread_count
  FROM
    ${table}
  GROUP BY
    post_username
  ORDER BY
    thread_count DESC
  LIMIT
    1;`;

  // Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query
  const options = {
    query: sqlQuery,
    useLegacySql: true, // Use standard SQL syntax for queries.
  };

  // Runs the query
  var to_return = await bigquery
  .query(options)
  .then(results => {
    const freq_posters = results[0];
    
    return ({
      success: true,
      data: freq_posters
    });
  })
  .catch(err => {
    return ({
      success: false,
      error: err.errors
    });
  });
  return to_return;
  
}

// =====
  
  
// Using router config when we call '/api'
app.use('/api', router)

// Listening to spesific port
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
  