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


router.get('/words/:since/:until', (req,res) => {
  
  const cache_key = req.url;
  console.log(`cache_key = ${req.url}`);
  const TTL = 10*60; // 10 minutes
  const limit = (req.query.limit) ? req.query.limit : 15;
  
  client.get(cache_key, function(err, data){
    if (data){
      console.log("Cached");
      return res.json(JSON.parse(data));
    }
    else {
      console.log("Not Cached");
      const start_date = req.params.since;
      const end_date = req.params.until;
      
      getWords(start_date, end_date, limit).then((result) => {
        client.setex(cache_key, TTL, JSON.stringify(result));
        return res.json(result);
      }, (err) => {
        return res.json({success:false, error: err});
      });
      
    }

  })

  
})


router.get('/trend/:since/:until/:word', (req,res) => {
  
  const cache_key = req.url;
  console.log(`cache_key = ${req.url}`);
  const TTL = 10*60; // 10 minutes
  
  
  client.get(cache_key, function(err, data){
    if (data){
      console.log("Cached");
      return res.json(JSON.parse(data));
    }
    else {
      console.log("Not Cached");
      const start_date = req.params.since;
      const end_date = req.params.until;
      const word = req.params.word;
      
      getTrendWords(start_date, end_date, word).then((result) => {
        client.setex(cache_key, TTL, JSON.stringify(result));
        return res.json(result);
      }, (err) => {
        return res.json({success:false, error: err});
      });
      
    }

  })

  
})

router.get('/frequent-poster/:since/:until', (req,res) => {
  
  const date_key = req.url;
  console.log(`date_key = ${req.url}`);
  const TTL = 10*60; // 10 minutes
  
  const limit = (req.query.limit) ? req.query.limit : 15; // Set default limit to 15
  
  client.get(date_key, function(err, data){
    if (data){
      console.log("Cached");
      return res.json(JSON.parse(data));
    }
    else {
      console.log("Not Cached");
      const start_date = req.params.since.split('-').join("");
      const end_date = req.params.until.split('-').join("");
      if (req.query.forum) {
        getPerForumFrequentPoster(start_date,end_date,req.query.forum,limit).then((result) => {
          client.setex(date_key, TTL, JSON.stringify(result));
          return res.json(result);
        }, (err) => {
          return res.json({success:false, error: err});
        });

      } else {
        getGlobalFrequentPoster(start_date,end_date,limit).then((result) => {
          client.setex(date_key, TTL, JSON.stringify(result));
          return res.json(result);
        }, (err) => {
          return res.json({success:false, error: err});
        });
      }
    }

  })

  
})

router.get('/test_query_string', (req, res) => {
  res.json(req.query);
  console.log(`Forum : ${req.query.forum}`);
  console.log(`Limit : ${req.query.limit}`);
});


router.get('/forum_list', (req, res)=> {
  const cache_key = req.url;
  console.log(`cache_key = ${req.url}`);
  const TTL = 10*60; // 10 minutes
  
  client.get(cache_key, function(err, data){
    if (data) {
      console.log("Cached");
      return res.json(JSON.parse(data));
    }
    else {
      console.log("Not Cached");
      getForumList().then((result) => {
        client.setex(cache_key, TTL, JSON.stringify(result));
        return res.json(result);
      }, (err) => {
        return res.json({success:false, error: err});
      });
    }
  })

})
// =======
  

// === Query Function ===
async function getForumList() {
  console.log('bbbbb  ');
  const sqlQuery = `
    SELECT forum_id, name as forum_name, description FROM \`learngcp-205504.my_new_dataset.forum\` ORDER BY forum_id;
    `;
  // Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query
  const options = {
    query: sqlQuery,
    useLegacySql: false, // Use Standard SQL syntax for queries.
  };

  // Runs the query
  var to_return = await bigquery
  .query(options)
  .then(results => {
    const rows = results[0];
    console.log("query success");
    // console.log(rows);
    return ({
      success: true,
      data: rows
    });
  })
  .catch(err => {
    console.log("query fail");
    throw err.errors;
  });
  return to_return;
}

async function getWords(start_date, end_date, limit) {
  const start_table_date = start_date.split("-").join("");
  const end_table_date = end_date.split("-").join("");
  const sqlQuery = `
  
  CREATE TEMP FUNCTION splitSentence(sentence string)
  RETURNS ARRAY<string>
  AS(
  SPLIT(REGEXP_REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(sentence,"\\\\[.*?\\\\]|\\\\n+"," "),"[ ]+[ ]"," "),"^ +| +$",'')," ")
  );


  SELECT LOWER(word) as word, count(*) as count
    FROM (

        (SELECT splitSentence(page_text) as words
        FROM \`learngcp-205504.my_new_dataset.post_*\`
        WHERE _TABLE_SUFFIX BETWEEN '${start_table_date}' and '${end_table_date}') as new_sentences
    CROSS JOIN UNNEST(new_sentences.words) as word)
  GROUP BY word
  ORDER BY count DESC
  LIMIT ${limit};`;

  // Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query
  const options = {
    query: sqlQuery,
    useLegacySql: false, // Use Standard SQL syntax for queries.
  };

  // Runs the query
  var to_return = await bigquery
  .query(options)
  .then(results => {
    const rows = results[0];
    console.log("query success");
    // console.log(rows);
    return ({
      success: true,
      data: rows
    });
  })
  .catch(err => {
    console.log("query fail");
    throw err.errors;
  });
  return to_return;
}


async function getPerForumFrequentPoster(start_date, end_date, forum_id, limit){
  const start_table_date = start_date.split("-").join("");
  const end_table_date = end_date.split("-").join("");

  // The SQL query to run
  const sqlQuery = `
  SELECT
  thread.forum_id,
  name AS forum_name,
  post.post_username,
  COUNT(*) AS post_count
  FROM
    \`learngcp-205504.my_new_dataset.thread_*\` AS thread
  INNER JOIN
    \`learngcp-205504.my_new_dataset.forum\` AS forum
  ON
    thread.forum_id = forum.forum_id
  INNER JOIN
    \`learngcp-205504.my_new_dataset.post_*\` AS post
  ON
    thread.id = post.thread_id
  WHERE
    (thread._TABLE_SUFFIX BETWEEN '${start_table_date}'
      AND '${end_table_date}')
    AND (post._TABLE_SUFFIX BETWEEN '${start_table_date}'
      AND '${end_table_date}')
    AND thread.forum_id = ${forum_id}
  GROUP BY
    forum_id,
    name,
    post_username
  ORDER BY
    post_count DESC
  LIMIT
    ${limit};`;
  
  // Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query
  const options = {
    query: sqlQuery,
    useLegacySql: false, // Use Standard SQL syntax for queries.
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
    throw err.errors
  });
  return to_return;
}

async function getGlobalFrequentPoster(start_date, end_date, limit){
  // The SQL query to run
  const start_table_date = start_date.split("-").join("");
  const end_table_date = end_date.split("-").join("");

  const sqlQuery = `
  SELECT post_username, COUNT(*) as post_count
  FROM \`learngcp-205504.my_new_dataset.post_*\`
  WHERE _TABLE_SUFFIX BETWEEN '${start_table_date}' AND '${end_table_date}'
  GROUP BY post_username
  ORDER BY post_count DESC
  LIMIT ${limit}`;

  // Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query
  const options = {
    query: sqlQuery,
    useLegacySql: false, // Use standard SQL syntax for queries.
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
    throw err.errors
  });
  return to_return;
}


async function getTrendWords(start_date, end_date, word) {
  
  const start_table_date = start_date.split("-").join("");
  const end_table_date = end_date.split("-").join("");
  
  const sqlQuery =`
  CREATE TEMP FUNCTION countWordInSentence(sentence string, key string )
  RETURNS INT64
  AS(
    (SELECT COUNT(*)
    FROM UNNEST(SPLIT(REGEXP_REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(sentence,"\\\\[.*?\\\\]"," "),"[ ]+[ ]"," "),"^ | $","")," ")) as word
    GROUP BY word
    HAVING word = key)
  );

  SELECT
    date,
    SUM(countWordInSentence(sentence,'${word}')) as counted_word  
  FROM (
    SELECT
    CAST(EXTRACT(DATE FROM TIMESTAMP_SECONDS(dateline))AS STRING) as date,
    page_text as sentence
    FROM \`kaskus-166400.intern_dataset.post_*\`
    WHERE _TABLE_SUFFIX BETWEEN '${start_table_date}' and '${end_table_date}')
  WHERE date >= '${start_date}'
  GROUP BY date
  ORDER BY date ASC;
  `;
  // console.log('Executed....');
    
  // Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query
  const options = {
    query: sqlQuery,
    useLegacySql: false, // Use Standard SQL syntax for queries.
  };

  // Runs the query
  var to_return = await bigquery
  .query(options)
  .then(results => {
    const rows = results[0];
    console.log("query success");
    console.log(rows);
    return ({
      success: true,
      data: rows
    });
  })
  .catch(err => {
    console.log("query fail");
    throw err.errors;
  });
  return to_return;
}

// =====
  
  
// Using router config when we call '/api'
app.use('/api', router)

// Listening to spesific port
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
  