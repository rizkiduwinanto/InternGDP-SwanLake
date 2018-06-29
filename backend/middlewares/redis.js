import redis from 'redis';

const client = redis.createClient({
  host: 'redis'
});

client.on('connect', () => {
  console.log(`connected to redis`);
});

client.on("error", function (err) {
  console.log(err);
});

client.set("akey", "string val", redis.print);
client.get("akey", redis.print);

module.exports = client;