import { PrismaClient } from '@prisma/client';
import logger from '../../../core/utils/logger';

const prisma = new PrismaClient();

async function main() {
  logger.info('Start seeding ...');
  // Seeding logic goes here
  // Example:
  // const user1 = await prisma.user.create({
  //   data: {
  //     email: 'alice@prisma.io',
  //     name: 'Alice',
  //   },
  // });
  logger.info('Seeding finished.');
}

main()
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });