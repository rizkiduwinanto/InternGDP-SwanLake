import PubSub from '@google-cloud/pubsub';

const pubsub = new PubSub();

const keyword = 'gan';

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
  if (msg.title && isContainKey(msg.title, key)){ // make sure it has page_text
     callEmailAPI();
  }
  else if (msg.page_text && (isContainKey(msg.page_text, key))) { // make sure it has page_text
    callEmailAPI();
  }
}

function callEmailAPI() {
  console.log('Email API called..');
}

function isContainKey(sentence, key) {
  return sentence.includes(key);
}



// MAIN LOGIC

// Create THREAD subscription handler
const threadSubHandler = pubsub.subscription(thread_subscription);
// Create POST subscription handler
const postSubHandler = pubsub.subscription(post_subscription);


threadSubHandler.on(`message`, threadMessageHandler);
postSubHandler.on(`message`, postMessageHandler);


console.log('Consumer established successfully');




