
var io = require('socket.io')(3002);

setInterval(function(){
  io.emit('post:new', {forum_id:4});
  console.log("test");
}, 2000);