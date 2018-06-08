


const init_socket_io = (server) => {

  const io = require('socket.io').listen(server);

  io.on('connection', (socket) => {
    console.log('A client connected');
    
    socket.on('thread', (data)=> {
      var forum_id = data.forum_id;
      console.log(forum_id);
      if (isUpdated(data.dateline)){
        io.emit(`thread:${forum_id}:update`,data);
      }
      else
        io.emit(`thread:${forum_id}:new`,data);
    })
  
    socket.on('post', (data)=> {
      var forum_id = data.forum_id;
      console.log(forum_id);
      if (isUpdated(data.dateline)){
        io.emit(`post:${forum_id}:update`,data);
      }
      else
        io.emit(`post:${forum_id}:new`,data);
    })
    
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

