import 'dotenv/config';
import App from './src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const appInstance = new App(prisma);

export const app = appInstance.getServer();
