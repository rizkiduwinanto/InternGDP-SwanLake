import redis from 'redis';
import _ from 'lodash';
import { getThreadIdMapForumId } from './bigquery';
const client = redis.createClient();

export const THREAD_ID_MAP_FORUM_ID = 'thread_id_map_forum_id';

client.on('connect', () => {
  console.log(`connected to redis`);
});


export function checkThreadIdMapForumIdFetched(){
  client.hlen(THREAD_ID_MAP_FORUM_ID,(err, dataLength) => {
    if (dataLength){
      console.log(`ThreadIdMapForumId Stored ${dataLength} rows`);
    } else {
      console.log('ThreadIdMapForumId Not stored');
      let stored_count = 0;
      const storeData = (data) => {
        if (data == -1){
          console.log(`All data stored successfully`);
        } else{

          const newData = _.transform(data, (result, e) => {
            result.push(e.id);
            result.push(e.forum_id);
          },[THREAD_ID_MAP_FORUM_ID]);
          client.hmset(newData);
          console.log(`Stored ${++stored_count}`);
        }
      }
      getThreadIdMapForumId(storeData);
    }
  });
}

export default client;