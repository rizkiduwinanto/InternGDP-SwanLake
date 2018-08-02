import client, { THREAD_ID_MAP_FORUM_ID } from './redis';
import chalk from 'chalk';
import { promisify } from 'util';
import { checkAndSendKeywordNotification } from './mailer';


const LOG_ROOT = `${chalk.black.bgWhite(' SERVICE - ')}${chalk.black.bgWhite('SOCKET.IO ')}`;
var io = null;


export const initSocketIO = server => {

  io = require('socket.io').listen(server);

  io.on('connection', socket => {
    console.log(`${LOG_ROOT} A client connected`);
    
    socket.on('thread', data => {
      const forumID = data.forum_id;
      if (isDateLineUpdated(data.dateline))
        io.emit(`thread:update`,data);
      else
        io.emit(`thread:new`,data);
    });
  
    socket.on('post', async data => {
      const threadID = data.thread_id;
      const getAsync = promisify(client.hget).bind(client);
      const getForumId = () => getAsync(THREAD_ID_MAP_FORUM_ID, threadID).then((result) => result);
      const forumID = await getForumId();
      try {
        checkAndSendKeywordNotification(data.page_text);
      } catch (error) {
        console.log(error);
      }

      if (forumID == null) return;

      if (isDateLineUpdated(data.dateline))
        io.emit(`post:update`,{...data, forum_id:forumID});
      else
        io.emit(`post:new`,{...data, forum_id:forumID});
    });
    
    socket.on('mail',(message) => {
	    console.log(`Received ${message}`);
	});
	  
    socket.on('disconnect',()=>{
      console.log(`${LOG_ROOT} A client disconnected`);
    });
  });

};

export default () => {
  return io;
};


function isDateLineUpdated(dateline){ 
  const TEN_MINUTES = 10*60;
  const now = Date.now() / 1000;
  console.log(`Now =  ${now} .. ContentDate = ${dateline}`);
  console.log(`Delta = ${now-dateline}`);
  return ((now - dateline) > TEN_MINUTES);
}



