import 'dotenv/config';
import App from './app';
import { env } from './config';
import logger from './core/utils/logger';
import { PrismaClient } from '@prisma/client';
import { createDependencyContainer } from './infrastructure/http/dependency-injection';

const prisma = new PrismaClient();
const dependencies = createDependencyContainer(prisma);

const app = new App(dependencies);

app.start(env.PORT, () => {
  logger.info(`Server is running on port ${env.PORT}`);
});