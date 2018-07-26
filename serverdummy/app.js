
var io = require('socket.io')(3002);

setInterval(function(){
  let log_data = 'Subject sent at 27 July 2016';
  io.emit('mail', log_data);
  console.log("test");
}, 12000);