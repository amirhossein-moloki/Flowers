import { createClient } from 'redis';
import { env } from '../../config';
import logger from '../../core/utils/logger';

const redisClient = createClient({
  url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
});

redisClient.on('connect', () => logger.info('Redis client connected'));
redisClient.on('error', (err) => logger.error('Redis Client Error', err));

(async () => {
  await redisClient.connect();
})();

export default redisClient;