import BigQuery from '@google-cloud/bigquery';
const bigquery = new BigQuery();


async function getForumList() {
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
    return ({
      success: true,
      data: rows
    });
  })
  .catch(err => {
    throw err.errors;
  });
  return to_return;
}

async function getThreadIdMapForumId(callback){
  const sqlQuery = `
    SELECT * FROM \`learngcp-205504.my_new_dataset.thread_forum\`
  `;

  const queryRows = `
    SELECT COUNT(*) as cnt FROM \`learngcp-205504.my_new_dataset.thread_forum\`
  `;

  const ROW_PAGINATION = 100000; // maximum 100000

  const ROWS = await bigquery
    .query({query:queryRows})
    .then( results => {
      let row_count = results[0][0].cnt;
      return row_count;
    }).catch(err => {throw errors});
  
  const TOTAL_OPERATION = (ROWS % ROW_PAGINATION == 0) ? (Math.floor(ROWS/ROW_PAGINATION)) : (Math.floor(ROWS/ROW_PAGINATION)+1)
  let current_operation = 0;
  
  bigquery.createQueryJob(sqlQuery).then( data => {
    const job = data[0];
    const manualPaginationCallback = (err, rows, nextQuery, apiResponse) => {
      console.log(`Fetching rows (${++current_operation}/${TOTAL_OPERATION})`);
      if (nextQuery){
        callback(rows);
        job.getQueryResults(nextQuery, manualPaginationCallback);
      }else {
        if (rows.length > 0){
          callback(rows);
        }
        callback(-1);
      }
    }

    job.getQueryResults({ 
      autoPaginate: false,
      maxResults: ROW_PAGINATION
    },  manualPaginationCallback);
    
  });
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


  SELECT LOWER(word) as text, count(*) as value
  FROM (
        (SELECT splitSentence(page_text) as words
        FROM \`learngcp-205504.my_new_dataset.post_*\`
        WHERE _TABLE_SUFFIX BETWEEN '${start_table_date}' and '${end_table_date}') as new_sentences
        CROSS JOIN UNNEST(new_sentences.words) as word)
  WHERE LOWER(word) NOT IN (SELECT * FROM \`learngcp-205504.my_new_dataset.stop_words\`)
  GROUP BY text
  ORDER BY value DESC
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
    return ({
      success: true,
      data: rows
    });
  })
  .catch(err => {
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
    IFNULL(SUM(countWordInSentence(sentence,'${word}')),0) as counted_word  
  FROM (
    SELECT
    CAST(EXTRACT(DATE FROM TIMESTAMP_SECONDS(dateline))AS STRING) as date,
    page_text as sentence
    FROM \`learngcp-205504.my_new_dataset.post_*\`
    WHERE _TABLE_SUFFIX BETWEEN '${start_table_date}' and '${end_table_date}')
  WHERE date >= '${start_date}'
  GROUP BY date
  ORDER BY date ASC;
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
    return ({
      success: true,
      data: rows
    });
  })
  .catch(err => {
    throw err.errors;
  });
  return to_return;
}

module.exports = {
  getForumList,
  getGlobalFrequentPoster,
  getPerForumFrequentPoster,
  getTrendWords,
  getThreadIdMapForumId,
  getWords };