var thread = {
  "id": "5a1ecf6b56e6afc2378b456b",
  "forum_id": "4",
  "title": "Afal Potongan Kain Katun Dilapis2x Untuk Lap Pembersih Segala Macam Kebutuhan",
  "dateline": "1528350753"
};

function publishMessage(topicName, data) {
  // [START pubsub_publish]
  // [START pubsub_quickstart_publisher]
  // Imports the Google Cloud client library
  const PubSub = require(`@google-cloud/pubsub`);

  // Creates a client
  const pubsub = new PubSub();

  /**
   * TODO(developer): Uncomment the following lines to run the sample.
   */
  // const topicName = 'your-topic';
  // const data = JSON.stringify({ foo: 'bar' });

  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(JSON.stringify(data));

  pubsub
    .topic(topicName)
    .publisher()
    .publish(dataBuffer)
    .then(messageId => {
      console.log(`Message ${messageId} published.`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END pubsub_publish]
  // [END pubsub_quickstart_publisher]
}

publishMessage('projects/learngcp-205504/topics/thread',thread);
