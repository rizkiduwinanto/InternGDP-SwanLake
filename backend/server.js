import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import http from 'http';

const app = express();
const server = http.createServer(app);
const API_PORT = process.env.API_PORT || 3001;


// TODO :
// - Where to put socket.io
// - Refactor middlewares/bigquery.js



// now we should configure the API to use bodyParser and look for JSON data in the request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/', require('./controller'));

server.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));


// == SOCKET IO
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

function isUpdated(dateline){ 
  const TEN_MINUTES = 10*60;
  const now = Date.now() / 1000;
  console.log(`Now =  ${now} .. ContentDate = ${dateline}`);
  console.log(`Delta = ${now-dateline}`);
  return ((now - dateline) > TEN_MINUTES);
}