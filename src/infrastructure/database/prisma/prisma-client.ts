import { PrismaClient } from '@prisma/client';
import logger from '../../../core/utils/logger';

const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'stdout', level: 'info' },
    { emit: 'stdout', level: 'warn' },
    { emit: 'stdout', level: 'error' },
  ],
});

prisma.$on('query', (e) => {
  logger.debug(`Query: ${e.query}, Params: ${e.params}, Duration: ${e.duration}ms`);
});

export default prisma;