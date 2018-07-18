import PubSub from '@google-cloud/pubsub';
import { SOCKET_ADDR, SOCKET_PORT } from './config';
var socket = require('socket.io-client')(`http://${SOCKET_ADDR}:${SOCKET_PORT}`);

// == SOCKET IO TEST AS FRONTEND
const subscribed_forum_id = '768';
socket.on(`thread:${subscribed_forum_id}:new`,(data)=>{
  console.log(`New thread :`);
  // console.log(data);
})
socket.on(`thread:${subscribed_forum_id}:update`,(data)=>{
  console.log(`Updated thread :`);
  // console.log(data);
})
socket.on(`post:${subscribed_forum_id}:new`,(data)=>{
  console.log(`New post :`);
  // console.log(data);
})
socket.on(`post:${subscribed_forum_id}:update`,(data)=>{
  console.log(`Updated post :`);
  // console.log(data);
})
// ==

const pubsub = new PubSub();

const keyword = 'jakarta';

const thread_subscription = 'sub_thread'
const post_subscription = 'sub_post'

const threadMessageHandler = message => {
  console.log(`[THREAD] Received message ${message.id}:`);

  var msg = JSON.parse(message.data);

  checkAlertForKeyword(msg, keyword);
  socket.emit('thread',msg);

  message.ack();
  
};
const postMessageHandler = message => {
  console.log(`[POST] Received message ${message.id}:`);

  var msg = JSON.parse(message.data);
  
  
  checkAlertForKeyword(message.data, keyword);
  socket.emit('post',msg);
  

  message.ack();
};



// MAIN LOGIC

// Create THREAD subscription handler
const threadSubHandler = pubsub.subscription(thread_subscription);
// Create POST subscription handler
const postSubHandler = pubsub.subscription(post_subscription);


threadSubHandler.on(`message`, threadMessageHandler);
postSubHandler.on(`message`, postMessageHandler);


console.log('Consumer established successfully');




