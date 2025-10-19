import express from 'express';
import request from 'supertest';
import { mock, mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { CreateOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/create-order-promotion.usecase';
import { GetOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/get-order-promotion.usecase';
import { UpdateOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/update-order-promotion.usecase';
import { DeleteOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/delete-order-promotion.usecase';
import { OrderPromotion } from '@/modules/order-promotion/domain/order-promotion.entity';
import { success } from '@/core/utils/result';

// 1. Create mock instances
const mockCreateOrderPromotionUseCase = mock<CreateOrderPromotionUseCase>();
const mockGetOrderPromotionUseCase = mock<GetOrderPromotionUseCase>();
const mockUpdateOrderPromotionUseCase = mock<UpdateOrderPromotionUseCase>();
const mockDeleteOrderPromotionUseCase = mock<DeleteOrderPromotionUseCase>();
const prismaMock = mockDeep<PrismaClient>();

// 2. Mock the use case modules to return the mock instances
jest.mock('@/modules/order-promotion/application/use-cases/create-order-promotion.usecase', () => ({
  CreateOrderPromotionUseCase: jest.fn().mockImplementation(() => mockCreateOrderPromotionUseCase),
}));
jest.mock('@/modules/order-promotion/application/use-cases/get-order-promotion.usecase', () => ({
  GetOrderPromotionUseCase: jest.fn().mockImplementation(() => mockGetOrderPromotionUseCase),
}));
jest.mock('@/modules/order-promotion/application/use-cases/update-order-promotion.usecase', () => ({
  UpdateOrderPromotionUseCase: jest.fn().mockImplementation(() => mockUpdateOrderPromotionUseCase),
}));
jest.mock('@/modules/order-promotion/application/use-cases/delete-order-promotion.usecase', () => ({
  DeleteOrderPromotionUseCase: jest.fn().mockImplementation(() => mockDeleteOrderPromotionUseCase),
}));

// 3. Mock the infrastructure layer
jest.mock('@/modules/order-promotion/infrastructure/prisma-order-promotion.repository');
jest.mock('@/infrastructure/database/prisma/prisma-client', () => ({
  __esModule: true,
  prisma: prismaMock,
}));

// 4. NOW import the router, which will use the mocks above
import { orderPromotionRouter } from '../order-promotion.routes';

const app = express();
app.use(express.json());
app.use('/order-promotions', orderPromotionRouter);

describe('OrderPromotionController', () => {
  const orderPromotion = OrderPromotion.create(
    {
      order_id: 'a7e5e3c2-c5f1-4a7b-8b0e-3e1a6c4c5b3d',
      promotion_id: 'b8f6e4c3-c6f2-4b8c-9a1f-4d2a7d5e6c4e',
      discount_applied: 10,
      created_at: new Date(),
    },
    'c9g7f5d4-d7g3-5c9d-0a2g-5e3b8e6d7c5f',
  ).value as OrderPromotion;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /order-promotions', () => {
    it('should return 201 and the created order-promotion', async () => {
      mockCreateOrderPromotionUseCase.execute.mockResolvedValue(success(orderPromotion));

      const response = await request(app)
        .post('/order-promotions')
        .send({
          order_id: 'a7e5e3c2-c5f1-4a7b-8b0e-3e1a6c4c5b3d',
          promotion_id: 'b8f6e4c3-c6f2-4b8c-9a1f-4d2a7d5e6c4e',
          discount_applied: 10,
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: 'c9g7f5d4-d7g3-5c9d-0a2g-5e3b8e6d7c5f',
        order_id: 'a7e5e3c2-c5f1-4a7b-8b0e-3e1a6c4c5b3d',
        promotion_id: 'b8f6e4c3-c6f2-4b8c-9a1f-4d2a7d5e6c4e',
        discount_applied: 10,
        created_at: expect.any(String),
      });
    });
  });

  describe('GET /order-promotions/:id', () => {
    it('should return 200 and the order-promotion', async () => {
      mockGetOrderPromotionUseCase.execute.mockResolvedValue(success(orderPromotion));

      const response = await request(app).get('/order-promotions/c9g7f5d4-d7g3-5c9d-0a2g-5e3b8e6d7c5f');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 'c9g7f5d4-d7g3-5c9d-0a2g-5e3b8e6d7c5f',
        order_id: 'a7e5e3c2-c5f1-4a7b-8b0e-3e1a6c4c5b3d',
        promotion_id: 'b8f6e4c3-c6f2-4b8c-9a1f-4d2a7d5e6c4e',
        discount_applied: 10,
        created_at: expect.any(String),
      });
    });
  });

  describe('PUT /order-promotions/:id', () => {
    it('should return 200 and the updated order-promotion', async () => {
      const updatedOrderPromotion = OrderPromotion.create(
        {
          ...orderPromotion.props,
          discount_applied: 15,
        },
        orderPromotion.id,
      ).value as OrderPromotion;
      mockUpdateOrderPromotionUseCase.execute.mockResolvedValue(success(updatedOrderPromotion));

      const response = await request(app)
        .put('/order-promotions/c9g7f5d4-d7g3-5c9d-0a2g-5e3b8e6d7c5f')
        .send({ discount_applied: 15 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 'c9g7f5d4-d7g3-5c9d-0a2g-5e3b8e6d7c5f',
        order_id: 'a7e5e3c2-c5f1-4a7b-8b0e-3e1a6c4c5b3d',
        promotion_id: 'b8f6e4c3-c6f2-4b8c-9a1f-4d2a7d5e6c4e',
        discount_applied: 15,
        created_at: expect.any(String),
      });
    });
  });

  describe('DELETE /order-promotions/:id', () => {
    it('should return 204', async () => {
      mockDeleteOrderPromotionUseCase.execute.mockResolvedValue(success(undefined as any));

      const response = await request(app).delete('/order-promotions/c9g7f5d4-d7g3-5c9d-0a2g-5e3b8e6d7c5f');

      expect(response.status).toBe(204);
    });
  });
});
