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

    socket.on('mail', (message) => {
      // console.log(`Received ${message}`);
    });

    socket.on('disconnect', () => {
      console.log(`${LOG_ROOT} A client disconnected`);
    });
  });

};

export default () => {
  return io;
};


export async function emitThread(data) {
  client.hset(THREAD_ID_MAP_FORUM_ID, data._id, data.forum_id, () => {
    if (isDateLineUpdated(data.dateline)) {
      io.emit(`thread:update`, { ...data, id: data._id, page_text: bbparser(data.page_text) });
      console.log(`Emitted Thread ${data._id}`);
    }
    else {
      io.emit(`thread:new`, { ...data, id: data._id, page_text: bbparser(data.page_text) });
      console.log(`Emitted Thread ${data._id}`);
    }
  });
}

export async function emitPost(data) {
  const TIMEOUT_MILISEC = 3000;
  const getAsync = promisify(client.hget).bind(client);
  const getForumId = () => getAsync(THREAD_ID_MAP_FORUM_ID, threadID).then((result) => result);
  const emittingPost = async () => {
    let f_id = await getForumId();
    if (f_id == null) {
      console.log(`Not found forum_id after ${TIMEOUT_MILISEC} ms`);
      return;
    }
    if (isDateLineUpdated(data.dateline)) {
      io.emit(`post:update`, { ...data, id: data._id, page_text: bbparser(data.page_text), forum_id: f_id });
      console.log(`Emitted Post ${data._id}`);
    }
    else {
      io.emit(`post:new`, { ...data, id: data._id, page_text: bbparser(data.page_text), forum_id: f_id });
      console.log(`Emitted Post ${data._id}`);
    }
  }
  if (!data.thread_id) return;
  const threadID = data.thread_id;
    
  try {
    if (!data.page_text || !data._id) return;
    console.log("Checked");
    checkAndSendKeywordNotification(data.page_text, data._id);
  } catch (error) {
    console.log(error);
  }
  
  const forumID = await getForumId();
  if (forumID == null) {
    setTimeout(emittingPost, TIMEOUT_MILISEC);
  } else {
    emittingPost();
  }

}

export function isDateLineUpdated(dateline) {
  const TEN_MINUTES = 10 * 60;
  const now = Date.now() / 1000;
  // console.log(`Now =  ${now} .. ContentDate = ${dateline}`);
  // console.log(`Delta = ${now-dateline}`);
  return ((now - dateline) > TEN_MINUTES);
}



