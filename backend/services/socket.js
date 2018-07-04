import client, { THREAD_ID_MAP_FORUM_ID } from './redis';
import chalk from 'chalk';
import { promisify } from 'util';

const LOG_ROOT = `${chalk.black.bgWhite(' SERVICE - ')}${chalk.black.bgWhite('SOCKET.IO ')}`;

export const initSocketIO = server => {

  const io = require('socket.io').listen(server);

  io.on('connection', socket => {
    console.log(`${LOG_ROOT} A client connected`);
    
    socket.on('thread', data => {
      const forumID = data.forum_id;
      if (isDateLineUpdated(data.dateline))
        io.emit(`thread:${forumID}:update`,data);
      else
        io.emit(`thread:${forumID}:new`,data);
    });
  
    socket.on('post', async data => {
      const threadID = data.thread_id;
      const getAsync = promisify(client.hget).bind(client);
      const getForumId = () => getAsync(THREAD_ID_MAP_FORUM_ID, threadID).then((result) => result);
      const forumID = await getForumId();

      if (forumID == null) return;

      if (isDateLineUpdated(data.dateline))
        io.emit(`post:${forumID}:update`,data);
      else
        io.emit(`post:${forumID}:new`,data);
    });
    
    socket.on('disconnect',()=>{
      console.log(`${LOG_ROOT} A client disconnected`);
    });
  });

};

function isDateLineUpdated(dateline){ 
  const TEN_MINUTES = 10*60;
  const now = Date.now() / 1000;
  console.log(`Now =  ${now} .. ContentDate = ${dateline}`);
  console.log(`Delta = ${now-dateline}`);
  return ((now - dateline) > TEN_MINUTES);
}



