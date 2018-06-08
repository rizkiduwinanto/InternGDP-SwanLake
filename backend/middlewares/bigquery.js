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
  getWords };