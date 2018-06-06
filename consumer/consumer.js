import PubSub from '@google-cloud/pubsub';

const pubsub = new PubSub();

const keyword = 'kain';

const thread_subscription = 'sub_thread'
const post_subscription = 'sub_post'

const threadMessageHandler = message => {
  console.log(`[THREAD] Received message ${message.id}:`);


  checkAlertForKeyword(message.data, keyword);


  message.ack();
};
const postMessageHandler = message => {
  console.log(`[POST] Received message ${message.id}:`);


  checkAlertForKeyword(message.data, keyword);


  message.ack();
};

function checkAlertForKeyword(data, key){
  var msg = JSON.parse(data);
  if (msg.title && isContainKey(msg.title, key) || msg.page_text && isContainKey(msg.page_text, key)){ // make sure it has page_text
     callEmailAPI();
  }
}


function callEmailAPI() {
  console.log('Email API called..');
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




