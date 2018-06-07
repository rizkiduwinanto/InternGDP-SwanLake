import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
  console.log(`connected to redis`);
});

module.exports = client;