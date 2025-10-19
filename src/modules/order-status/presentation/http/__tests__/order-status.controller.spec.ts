import 'reflect-metadata';
import request from 'supertest';
import express from 'express';
import { mockDeep } from 'jest-mock-extended';
import { OrderStatus } from '../../../domain/order-status.entity';
import orderStatusRouter from '../routes';
import { PrismaOrderStatusRepository } from '../../../infrastructure/prisma-order-status.repository';
import { prismaClient } from '@/infrastructure/database/prisma/prisma-client';

jest.mock('@/infrastructure/database/prisma/prisma-client', () => ({
  prismaClient: mockDeep(),
}));

const prismaMock = prismaClient as unknown as ReturnType<typeof mockDeep>;

describe('OrderStatusController', () => {
  let app: express.Express;
  const orderStatusRepositoryMock = mockDeep<PrismaOrderStatusRepository>();

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/order-statuses', orderStatusRouter);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(PrismaOrderStatusRepository.prototype, 'findAll').mockImplementation(orderStatusRepositoryMock.findAll);
    jest.spyOn(PrismaOrderStatusRepository.prototype, 'findById').mockImplementation(orderStatusRepositoryMock.findById);
  });

  describe('GET /order-statuses', () => {
    it('should return a list of order statuses', async () => {
      const orderStatuses = [
        OrderStatus.create({ code: 'pending', name: 'Pending', display_order: 1 }).value,
        OrderStatus.create({ code: 'processing', name: 'Processing', display_order: 2 }).value,
      ];
      orderStatusRepositoryMock.findAll.mockResolvedValue(orderStatuses);

      const response = await request(app).get('/order-statuses');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].code).toBe('pending');
    });
  });

  describe('GET /order-statuses/:id', () => {
    it('should return an order status by id', async () => {
      const orderStatus = OrderStatus.create({ code: 'pending', name: 'Pending', display_order: 1 }).value;
      orderStatusRepositoryMock.findById.mockResolvedValue(orderStatus);

      const response = await request(app).get(`/order-statuses/${orderStatus.id}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(orderStatus.id);
      expect(response.body.code).toBe('pending');
    });

    it('should return 404 if order status not found', async () => {
      orderStatusRepositoryMock.findById.mockResolvedValue(null);

      const response = await request(app).get('/order-statuses/123');

      expect(response.status).toBe(404);
    });
  });
});
