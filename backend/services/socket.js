import client, { THREAD_ID_MAP_FORUM_ID } from './redis';
import chalk from 'chalk';
import { promisify } from 'util';
import { checkAndSendKeywordNotification } from './mailer';
import bbparser from '../utils/bbcode_parser';


const LOG_ROOT = `${chalk.black.bgWhite(' SERVICE - ')}${chalk.black.bgWhite('SOCKET.IO ')}`;
var io = null;


export const initSocketIO = server => {

  io = require('socket.io').listen(server);

  io.on('connection', socket => {
    console.log(`${LOG_ROOT} A client connected`);
    
    socket.on('thread', data => {
      emitThread(data);
    });
  
    socket.on('post', async data => {
      emitPost(data);
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

export async function emitThread(data) {
  if (isDateLineUpdated(data.dateline))
    io.emit(`thread:update`,{...data,page_text:bbparser(data.page_text)});
  else
    io.emit(`thread:new`,{...data,page_text:bbparser(data.page_text)});
}

export async function emitPost(data) {
  const threadID = data.thread_id;
  const getAsync = promisify(client.hget).bind(client);
  const getForumId = () => getAsync(THREAD_ID_MAP_FORUM_ID, threadID).then((result) => result);
  const forumID = await getForumId();
  try {
    checkAndSendKeywordNotification(data.page_text, data.id);
  } catch (error) {
    console.log(error);
  }

  if (forumID == null) return;

  if (isDateLineUpdated(data.dateline))
    io.emit(`post:update`,{...data,page_text:bbparser(data.page_text), forum_id:forumID});
  else
    io.emit(`post:new`,{...data,page_text:bbparser(data.page_text), forum_id:forumID});
}

export function isDateLineUpdated(dateline){ 
  const TEN_MINUTES = 10*60;
  const now = Date.now() / 1000;
  console.log(`Now =  ${now} .. ContentDate = ${dateline}`);
  console.log(`Delta = ${now-dateline}`);
  return ((now - dateline) > TEN_MINUTES);
}



