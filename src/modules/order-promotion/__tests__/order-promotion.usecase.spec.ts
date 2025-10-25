import { CreateOrderPromotionUseCase } from '../application/use-cases/create-order-promotion.usecase';
import { PrismaOrderPromotionRepository } from '../infrastructure/prisma-order-promotion.repository';
import prisma from '@/infrastructure/database/prisma/prisma-client';
import { Order, Promotion, User } from '@prisma/client';
import { randomUUID } from 'crypto';

describe('OrderPromotion UseCase Tests', () => {
  let createOrderPromotionUseCase: CreateOrderPromotionUseCase;
  let order: Order;
  let promotion: Promotion;
  let user: User;

  beforeAll(async () => {
    const orderPromotionRepository = new PrismaOrderPromotionRepository(prisma);
    createOrderPromotionUseCase = new CreateOrderPromotionUseCase(orderPromotionRepository);

    user = await prisma.user.create({
      data: {
        id: randomUUID(),
        email: 'test-user@example.com',
        username: 'test-user',
        password: 'password',
      },
    });

    order = await prisma.order.create({
      data: {
        id: randomUUID(),
        userId: user.id,
        total: 100,
        status: 'PENDING',
      },
    });

    promotion = await prisma.promotion.create({
      data: {
        id: randomUUID(),
        name: 'Test Promotion',
        code: 'TESTPROMO',
        discount_type: 'FIXED_AMOUNT',
        discount_value: 10,
        start_date: new Date(),
      },
    });
  });

  afterAll(async () => {
    await prisma.orderPromotion.deleteMany();
    await prisma.order.deleteMany();
    await prisma.promotion.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should create an order promotion', async () => {
    const result = await createOrderPromotionUseCase.execute({
      order_id: order.id,
      promotion_id: promotion.id,
      discount_applied: 10,
    });

    expect(result.success).toBe(true);
    expect(result.value).toBeDefined();
  });
});
