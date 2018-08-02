var thread = {
  "id": "5a1ecf6b56e6afc2378b456b",
    "forum_id": "4",
    "title": "Afal Potongan Kain Katun Dilapis2x Untuk Lap Pembersih Segala Macam Kebutuhan",
    "dateline": "1511968619",
    "poll_id": "0",
    "open": "1",
    "visible": "1",
    "reply_count": "0",
    "views": "162",
    "icon_id": null,
    "post_username": "lsutrisno",
    "post_user_id": "9674985",
    "first_post_id": "5a1ecf6b56e6afc2378b456a",
    "last_poster": "lsutrisno",
    "last_post_user_id": "9674985",
    "last_post": "1527084916",
    "last_post_id": "5a1ecf6b56e6afc2378b456a",
    "sticky": "0",
    "deleted_count": "0",
    "hidden_count": null,
    "prefix_id": "WTS",
    "vote_num": null,
    "vote_total": null,
    "meta_images": [],
    "view_popular": null,
    "hot_thread": null,
    "top_thread": null,
    "social_media_counter": null,
    "verified_creator": null,
    "item_condition": "1",
    "item_price": "10000",
    "item_location": "12",
    "tag_search": "#Afal,#Potongan,#Kain,#Katun,#Dilapis2x,#Lap,#Pembersih",
    "gate_action": "WTS",
    "sundul_count": "2",
    "type": "1",
    "resources": {
       "images": [
          "/images/fjb/2017/11/29/afal_potongan_kain_katun_dilapis2x_untuk_lap_pembersih_segala_macam_kebutuhan_9674985_1511968538.jpg",
          "/images/fjb/2017/11/29/afal_potongan_kain_katun_dilapis2x_untuk_lap_pembersih_segala_macam_kebutuhan_9674985_1511968545.jpg",
          "/images/fjb/2017/11/29/afal_potongan_kain_katun_dilapis2x_untuk_lap_pembersih_segala_macam_kebutuhan_9674985_1511968551.jpg"
       ],
       "thumbnail": "/images/fjb/2017/11/29/afal_potongan_kain_katun_dilapis2x_untuk_lap_pembersih_segala_macam_kebutuhan_9674985_1511968538.jpg"
    },
    "discount": "0",
    "payment_method": {
       "COD": "1",
       "BUYNOW": "3"
    },
    "shipping_info": {
       "agents": false,
       "insurance": true,
       "others_agents": [],
       "weight": "1000"
    },
    "free_shipping": "0",
    "short_url": "itUXr",
    "image_size": null,
    "content_url": null,
    "thread_type": null,
    "content_filename": null,
    "video_type": null
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

setInterval(() => {
  publishMessage('projects/learngcp-205504/topics/thread',thread)
},5000);
