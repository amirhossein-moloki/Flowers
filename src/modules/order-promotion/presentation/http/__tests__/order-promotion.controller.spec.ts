import express from 'express';
import request from 'supertest';
import { mock, mockDeep } from 'jest-mock-extended';

jest.mock('@/core/middlewares/auth.middleware', () => ({
  isAuthenticated: jest.fn((req, res, next) => next()),
  hasRole: jest.fn(() => (req, res, next) => next()),
}));
import { PrismaClient } from '@prisma/client';
import { CreateOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/create-order-promotion.usecase';
import { GetOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/get-order-promotion.usecase';
import { UpdateOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/update-order-promotion.usecase';
import { DeleteOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/delete-order-promotion.usecase';
import { OrderPromotionDto } from '@/modules/order-promotion/application/dtos/order-promotion.dto';
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
import { createOrderPromotionRoutes } from '../order-promotion.routes';
import { PrismaOrderPromotionRepository } from '@/modules/order-promotion/infrastructure/prisma-order-promotion.repository';

const app = express();
app.use(express.json());
const mockOrderPromotionRepository = mock<PrismaOrderPromotionRepository>();
app.use('/api/v1/order-promotions', createOrderPromotionRoutes(mockOrderPromotionRepository));

describe('OrderPromotionController', () => {
  const orderPromotion: OrderPromotionDto = {
    id: 'c9g7f5d4-d7g3-5c9d-0a2g-5e3b8e6d7c5f',
    order_id: 'a7e5e3c2-c5f1-4a7b-8b0e-3e1a6c4c5b3d',
    promotion_id: 'b8f6e4c3-c6f2-4b8c-9a1f-4d2a7d5e6c4e',
    discount_applied: 10,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /order-promotions', () => {
    it('should return 201 and the created order-promotion', async () => {
      mockCreateOrderPromotionUseCase.execute.mockResolvedValue(success(orderPromotion));

      const response = await request(app)
        .post('/api/v1/order-promotions')
        .send({
          order_id: 'a7e5e3c2-c5f1-4a7b-8b0e-3e1a6c4c5b3d',
          promotion_id: 'b8f6e4c3-c6f2-4b8c-9a1f-4d2a7d5e6c4e',
          discount_applied: 10,
        });

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        id: 'c9g7f5d4-d7g3-5c9d-0a2g-5e3b8e6d7c5f',
        order_id: 'a7e5e3c2-c5f1-4a7b-8b0e-3e1a6c4c5b3d',
        promotion_id: 'b8f6e4c3-c6f2-4b8c-9a1f-4d2a7d5e6c4e',
        discount_applied: 10,
      });
    });
  });

  describe('GET /order-promotions/:id', () => {
    it('should return 200 and the order-promotion', async () => {
      mockGetOrderPromotionUseCase.execute.mockResolvedValue(success(orderPromotion));

      const response = await request(app).get('/api/v1/order-promotions/c9g7f5d4-d7g3-5c9d-0a2g-5e3b8e6d7c5f');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: 'c9g7f5d4-d7g3-5c9d-0a2g-5e3b8e6d7c5f',
        order_id: 'a7e5e3c2-c5f1-4a7b-8b0e-3e1a6c4c5b3d',
        promotion_id: 'b8f6e4c3-c6f2-4b8c-9a1f-4d2a7d5e6c4e',
        discount_applied: 10,
      });
    });
  });

  describe('PUT /order-promotions/:id', () => {
    it('should return 200 and the updated order-promotion', async () => {
      const updatedOrderPromotion: OrderPromotionDto = {
        ...orderPromotion,
        discount_applied: 15,
      };
      mockUpdateOrderPromotionUseCase.execute.mockResolvedValue(success(updatedOrderPromotion));

      const response = await request(app)
        .put('/api/v1/order-promotions/c9g7f5d4-d7g3-5c9d-0a2g-5e3b8e6d7c5f')
        .send({ discount_applied: 15 });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: 'c9g7f5d4-d7g3-5c9d-0a2g-5e3b8e6d7c5f',
        order_id: 'a7e5e3c2-c5f1-4a7b-8b0e-3e1a6c4c5b3d',
        promotion_id: 'b8f6e4c3-c6f2-4b8c-9a1f-4d2a7d5e6c4e',
        discount_applied: 15,
      });
    });
  });

  describe('DELETE /order-promotions/:id', () => {
    it('should return 204', async () => {
      mockDeleteOrderPromotionUseCase.execute.mockResolvedValue(success(undefined as any));

      const response = await request(app).delete('/api/v1/order-promotions/c9g7f5d4-d7g3-5c9d-0a2g-5e3b8e6d7c5f');

      expect(response.status).toBe(204);
    });
  });
});
