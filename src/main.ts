import 'dotenv/config';
import App from './app';
import { env } from './config';
import logger from './core/utils/logger';

const app = new App();

app.start(env.PORT, () => {
  logger.info(`Server is running on port ${env.PORT}`);
});