import redis from 'redis';
import chalk from 'chalk';
import _ from 'lodash';
import { getThreadIdMapForumId } from '../services/bigquery';
import config from '../config';
const client = redis.createClient({
  host: config.REDIS_HOST
});



export const THREAD_ID_MAP_FORUM_ID = 'thread_id_map_forum_id';

const LOG_ROOT = `${chalk.black.bgWhite(' SERVICE - ')}${chalk.black.bgWhite('REDIS ')}`;

client.on('connect', () => {
  console.log(`${LOG_ROOT} connected to redis`);
});

export function checkThreadIdMapForumIdFetched() {
  client.hlen(THREAD_ID_MAP_FORUM_ID, (err, dataLength) => {
    if (dataLength) {
      console.log(`${LOG_ROOT} ThreadIdMapForumId Stored ${dataLength} rows`);
    } else {
      console.log(`${LOG_ROOT} ThreadIdMapForumId Not stored`);
      let stored_count = 0;
      const storeData = (data) => {
        if (data == -1){
          console.log(`${LOG_ROOT} All data stored successfully`);
        } else{
          const newData = _.transform(data, (result, e) => {
            result.push(e.id);
            result.push(e.forum_id);
          },[THREAD_ID_MAP_FORUM_ID]);
          client.hmset(newData);
          console.log(`${LOG_ROOT} Stored ${++stored_count}`);
        }
      }
      getThreadIdMapForumId(storeData);
    }
  });
}

export default client;