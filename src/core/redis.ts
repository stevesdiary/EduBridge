import Redis from 'ioredis';

const MAX_RETRIES = 3;
const RETRY_BASE_DELAY = 3000; // 1 second

let redisClient: Redis | null = null;

async function initializeRedisConnection(): Promise<Redis> {
  if (!redisClient) {
    redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379 ,
      password: process.env.REDIS_PASSWORD || 'password',
      username: process.env.REDIS_USERNAME,
      db: Number(process.env.REDIS_DATABASE_NAME) || 0,
      maxRetriesPerRequest: MAX_RETRIES,
      retryStrategy(times: number) {
        if (times > MAX_RETRIES) {
          console.error('Max redis connection retries reached. Giving up.');
          return null;
        }
        
        const delay = Math.min(times * RETRY_BASE_DELAY, 3000);
        console.log(`Retrying redis connection in ${delay}ms... (Attempt ${times}/${MAX_RETRIES})`);
        return delay;
      },
      reconnectOnError(err) {
        const targetError = 'READONLY';
        if (err.message.includes(targetError)) {
          return true;
        }
        return false;
      }
    });

    redisClient.on('connect', () => {
      console.log('Redis connected successfully');
    });

    redisClient.on('error', (err) => {
      console.error('Redis client error:', err);
    });

    redisClient.on('close', () => {
      console.log('Redis connection closed');
    });

    redisClient.on('reconnecting', (delay: number) => {
      console.log(`Redis client reconnecting in ${delay}ms`);
    });

    // const shutdownSignals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
    // shutdownSignals.forEach(signal => {
    //   process.once(signal, async () => {
    //     console.log(`Received ${signal}, initiating graceful shutdown...`);
    //     await gracefulShutdown();
    //   });
    // });
  }

  return redisClient;
}

async function saveToRedis(key: string, value: string, expirationInSeconds: number): Promise<void> {
  if (!redisClient) {
    throw new Error('Redis client not initialized');
  }

  try {
    await redisClient.set(key, value, 'EX', expirationInSeconds);
    console.log(`Successfully saved ${key} to Redis`);
  } catch (err) {
    console.error('Error saving to Redis:', err);
    throw err;
  }
}

async function getFromRedis(key: string): Promise<string | null> {
  if (!redisClient) {
    throw new Error('Redis client not initialized');
  }

  try {
    const value = await redisClient.get(key);
    if (value) {
      console.log(`Successfully retrieved ${key} from Redis`);
    }
    return value;
  } catch (err) {
    console.error('Error retrieving from Redis:', err);
    throw err;
  }
}

async function deleteFromRedis (key: string): Promise<boolean> {
  try {
    if (!redisClient) {
      throw new Error('Redis client not initialized');
    }
    const result = await redisClient.del(key);
    return result === 1; // Returns true if key was deleted, false if key didn't exist
  } catch (error) {
    console.error(`Failed to delete key ${key} from Redis:`, error);
    return false;
  }
};

async function gracefulShutdown(): Promise<void> {
  if (redisClient) {
    try {
      console.log('Closing Redis connection...');
      await redisClient.quit();
      console.log('Redis connection closed successfully');
    } catch (err) {
      console.error('Error closing Redis connection:', err);
      await redisClient.disconnect();
    } finally {
      redisClient = null;
      process.exit(0);
    }
  }
}

initializeRedisConnection().catch(err => {
  console.error('Failed to initialize Redis connection:', err);
  process.exit(1);
});

export { getFromRedis, saveToRedis, deleteFromRedis };
