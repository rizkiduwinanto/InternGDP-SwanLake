import BigQuery from '@google-cloud/bigquery';
import { 
  getWordsQuery,
  getPerForumFrequentPosterQuery,
  getGlobalFrequentPosterQuery,
  getTrendWordsQuery
 } from '../queries';
import { start } from 'repl';
const bigquery = new BigQuery();

export async function getForumList() {
  const getForumListQuery = `
    SELECT forum_id, name as forum_name, description FROM \`learngcp-205504.my_new_dataset.forum\` ORDER BY forum_id;
    `;
  const queryResult = await getQueryResult(getForumListQuery);
  return createAPIFormat(queryResult);
}

export async function getThreadIdMapForumId(storeRedisCallback){
  const threadIdMapForumIdQuery = `
    SELECT * FROM \`learngcp-205504.my_new_dataset.thread_forum\`
  `;
  const queryRows = `
    SELECT COUNT(*) as cnt FROM \`learngcp-205504.my_new_dataset.thread_forum\`
  `;
  const ROW_PAGINATION = 100000; // maximum 100000
  let queryResult = await getQueryResult(queryRows);
  const ROWS = queryResult[0][0].cnt
  const TOTAL_OPERATION = (ROWS % ROW_PAGINATION == 0) ? (Math.floor(ROWS/ROW_PAGINATION)) : (Math.floor(ROWS/ROW_PAGINATION)+1)
  let current_operation = 0;
  
  bigquery.createQueryJob(threadIdMapForumIdQuery).then( data => {
    job.getQueryResults({ 
      autoPaginate: false,
      maxResults: ROW_PAGINATION
    },  manualPaginationCallback);

    const job = data[0];
    const FINISHED = -1;
    const manualPaginationCallback = (err, rows, nextQuery, apiResponse) => {
      console.log(`Fetching rows (${++current_operation}/${TOTAL_OPERATION})`);
      if (nextQuery){
        storeRedisCallback(rows);
        job.getQueryResults(nextQuery, manualPaginationCallback);
      }else {
        if (rows.length > 0){
          storeRedisCallback(rows);
        }
        storeRedisCallback(FINISHED);
      }
    }
  });
}

export async function getWords(startDate, endDate, limit) {
  const wordsQuery = getWordsQuery(startDate, endDate, limit);
  const queryResult = await getQueryResult(wordsQuery);
  return createAPIFormat(queryResult);
}

export async function getPerForumFrequentPoster(startDate, endDate, forumId, limit){
  const posterPerForumQuery = getPerForumFrequentPosterQuery(startDate, endDate, forumId, limit);
  console.log(posterPerForumQuery);
  const queryResult = await getQueryResult(posterPerForumQuery);
  return createAPIFormat(queryResult);
}

export async function getGlobalFrequentPoster(startDate, endDate, limit){
  const posterGlobalQuery = getGlobalFrequentPosterQuery(startDate, endDate, limit);
  const queryResult = await getQueryResult(posterGlobalQuery);
  return createAPIFormat(queryResult);
}

export async function getTrendWords(startDate, endDate, word) {
  const trendWordsQuery = getTrendWordsQuery(startDate, endDate, word);
  const queryResult = await getQueryResult(trendWordsQuery);
  return createAPIFormat(queryResult);
}


const getQueryResult = async sqlQuery => 
  await bigquery
  .query({query: sqlQuery})
  .then(result => {
    return result;
  }).catch(err => {
    throw err;
  });

const createAPIFormat = queryResult => {
  return {success: true, data: queryResult[0]}
};
