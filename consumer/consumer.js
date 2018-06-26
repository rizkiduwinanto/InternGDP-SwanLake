import PubSub from '@google-cloud/pubsub';
import axios from 'axios';
import config from '../backend/config';
var socket = require('socket.io-client')(`http://${config.API_ADDR}:${config.API_PORT}`);

// == SOCKET IO TEST AS FRONTEND
const subscribed_forum_id = '768';
socket.on(`thread:${subscribed_forum_id}:new`,(data)=>{
  console.log(`New thread :`);
  console.log(data);
})
socket.on(`thread:${subscribed_forum_id}:update`,(data)=>{
  console.log(`Updated thread :`);
  console.log(data);
})
socket.on(`post:${subscribed_forum_id}:new`,(data)=>{
  console.log(`New post :`);
  console.log(data);
})
socket.on(`post:${subscribed_forum_id}:update`,(data)=>{
  console.log(`Updated post :`);
  console.log(data);
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

function checkAlertForKeyword(msg, key){
  if (msg.title && isContainKey(msg.title, key) || msg.page_text && isContainKey(msg.page_text, key)){ // make sure it has page_text
     callEmailAPI();
  }
}


function callEmailAPI() {
  console.log('Sending email ...');
  const API_URL = 'http://localhost:3001/api/send_email';
  axios.get(API_URL).then(response => {
    console.log(`Resp  = ${response}`);
  }).catch(error => {
    console.log(error.response.data);
  });
}

function isContainKey(sentence, key) {
  const rgx_rm_bb_or_slash_n =  /\[.*?\]|\n+/gi;
  const rgx_trailing_space = /[ ]+[ ]/gi;
  const rgx_trim = /^ +| +$/gi;
  var new_sentence = sentence.replace(rgx_rm_bb_or_slash_n,' ').replace(rgx_trailing_space,' ').replace(rgx_trim,'');
  // console.log(`[Key = ${key}] New sentence = ${new_sentence}`);
  var arr_word = new_sentence.split(' ')
  for (var i = 0; i < arr_word.length; i++){
    if (key.toUpperCase() === arr_word[i].toUpperCase())
      return true;
  }
  return false;
}



// MAIN LOGIC

// Create THREAD subscription handler
const threadSubHandler = pubsub.subscription(thread_subscription);
// Create POST subscription handler
const postSubHandler = pubsub.subscription(post_subscription);


threadSubHandler.on(`message`, threadMessageHandler);
postSubHandler.on(`message`, postMessageHandler);


console.log('Consumer established successfully');




