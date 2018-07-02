import client, { THREAD_ID_MAP_FORUM_ID } from './redis';
import { promisify } from 'util';


const init_socket_io = (server) => {

  const io = require('socket.io').listen(server);

  io.on('connection', (socket) => {
    console.log('A client connected');
    
    socket.on('thread', (data) => {
      var forum_id = data.forum_id;
      if (isUpdated(data.dateline))
        io.emit(`thread:${forum_id}:update`,data);
      else
        io.emit(`thread:${forum_id}:new`,data);
    })
  
    socket.on('post', async (data) => {
      const thread_id = data.thread_id;
      const getAsync = promisify(client.hget).bind(client);
      const getForumId = () => getAsync(THREAD_ID_MAP_FORUM_ID,thread_id).then((result) => result);
      const forum_id = await getForumId();

      if (forum_id) {

        if (isUpdated(data.dateline))
          io.emit(`post:${forum_id}:update`,data);
        else
          io.emit(`post:${forum_id}:new`,data);
      }
        
    });
    
    socket.on('disconnect',()=>{
      console.log('A client disconnected');
    });
  });

};

function isUpdated(dateline){ 
  const TEN_MINUTES = 10*60;
  const now = Date.now() / 1000;
  console.log(`Now =  ${now} .. ContentDate = ${dateline}`);
  console.log(`Delta = ${now-dateline}`);
  return ((now - dateline) > TEN_MINUTES);
}


module.exports = init_socket_io;

