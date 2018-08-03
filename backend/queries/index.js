export function getWordsQuery(startDate, endDate, limit) {
  const startTableDate = startDate.split("-").join("");
  const endTableDate = endDate.split("-").join("");
  const query = `
  CREATE TEMP FUNCTION splitSentence(sentence string)
  RETURNS ARRAY<string>
  AS( 
  SPLIT(REGEXP_REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(sentence,"\\\\[.*?\\\\]|\\\\n+"," "),"[ ]+[ ]"," "),"^ +| +$",'')," ")
  );


  SELECT LOWER(word) as text, count(*) as value
  FROM (
        (SELECT splitSentence(page_text) as words
        FROM \`my_new_dataset.post_*\`
        WHERE _TABLE_SUFFIX BETWEEN '${startTableDate}' and '${endTableDate}') as new_sentences
        CROSS JOIN UNNEST(new_sentences.words) as word)
  WHERE LOWER(word) NOT IN (SELECT * FROM \`my_new_dataset.stop_words\`) AND LENGTH(word) > 1 AND word NOT LIKE ':%' AND NOT REGEXP_CONTAINS(word,'^\\\\d+[.]?$')
  GROUP BY text
  ORDER BY value DESC
  LIMIT ${limit};`;
  return query;
}

export function getPerForumFrequentPosterQuery(startDate, endDate, forumId, limit) {
  const startTableDate = startDate.split("-").join("");
  const endTableDate = endDate.split("-").join("");
  const query = `
  SELECT
  thread.forum_id,
  name AS forum_name,
  post.post_username,
  post.post_user_id,
  COUNT(*) AS post_count
  FROM
    \`my_new_dataset.thread_*\` AS thread
  INNER JOIN
    \`my_new_dataset.forum\` AS forum
  ON
    thread.forum_id = forum.forum_id
  INNER JOIN
    \`my_new_dataset.post_*\` AS post
  ON
    thread.id = post.thread_id
  WHERE
    (thread._TABLE_SUFFIX BETWEEN '${startTableDate}'
      AND '${endTableDate}')
    AND (post._TABLE_SUFFIX BETWEEN '${startTableDate}'
      AND '${endTableDate}')
    AND thread.forum_id = ${forumId}
  GROUP BY
    forum_id,
    name,
    post_username,
    post_user_id
  ORDER BY
    post_count DESC
  LIMIT
    ${limit};`;
  return query;
}

export function getGlobalFrequentPosterQuery(startDate, endDate, limit) {
  const startTableDate = startDate.split("-").join("");
  const endTableDate = endDate.split("-").join("");

  const query = `
  SELECT post_username, post_user_id, COUNT(*) as post_count
  FROM \`my_new_dataset.post_*\`
  WHERE _TABLE_SUFFIX BETWEEN '${startTableDate}' AND '${endTableDate}'
  GROUP BY post_username, post_user_id
  ORDER BY post_count DESC
  LIMIT ${limit}`;

  return query;
}

export function getTrendWordsQuery(startDate, endDate, word) {
  const startTableDate = startDate.split("-").join("");
  const endTableDate = endDate.split("-").join("");
  
  const query =`
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
    FROM \`my_new_dataset.post_*\`
    WHERE _TABLE_SUFFIX BETWEEN '${startTableDate}' and '${endTableDate}')
  WHERE date >= '${startDate}'
  GROUP BY date
  ORDER BY date ASC;
  `;
  return query;
}