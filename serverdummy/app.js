
var io = require('socket.io')(3002);

io.on('connection', function(socket){
  io.emit('mail', { will: 'test'});
  console.log("test");
})