const redis = require('redis');

let redisClient = null;

async function initializeRedisConnection() {
  if (!redisClient) {
    redisClient = redis.createClient({
      url: process.env.REDIS_URL,
      retryStrategy: (times) => {
        if (times >= 5) {
          return null;
        }
        return Math.min(times * 1000, 3000);
      },
    });

    redisClient.on('connect', () => {
      console.log('Connected to Redis');
    });

    redisClient.on('error', (err) => {
      console.error('Redis connection error:', err);
    });

    await redisClient.connect();
  }
  return redisClient;
}

/**
 * Save data to Redis with expiration
 * @param {string} key - The key to store the value under
 * @param {string} value - The value to store
 * @param {number} expirationInSeconds - Time until the key expires
 */
async function saveToRedis(key, value, expirationInSeconds) {
  try {
    const client = await initializeRedisConnection();
    await client.set(key, value, {
      EX: expirationInSeconds
    });
    console.log(`Successfully saved ${key} to Redis`);
  } catch (err) {
    console.error('Error saving to Redis:', err);
    throw err;
  }
}

/**
 * Retrieve data from Redis
 * @param {string} key - The key to retrieve
 * @returns {Promise<string|null>}
 */
async function getFromRedis(key) {
  try {
    const client = await initializeRedisConnection();
    const value = await client.get(key);
    // console.log(`Successfully retrieved ${key} from Redis`);
    return value;
  } catch (err) {
    console.error('Error retrieving from Redis:', err);
    throw err;
  }
}

async function closeRedisConnection() {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
  }
}

module.exports = { 
  saveToRedis, 
  getFromRedis,
  closeRedisConnection 
};
