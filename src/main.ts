import 'dotenv/config';
import App from './app';
import { env } from './config';
import logger from './core/utils/logger';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = new App(prisma);

app.start(env.PORT, () => {
  logger.info(`Server is running on port ${env.PORT}`);
});
