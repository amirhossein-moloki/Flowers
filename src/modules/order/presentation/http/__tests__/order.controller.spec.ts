import express from 'express';
import request from 'supertest';
import { mock } from 'jest-mock-extended';
import { Order, OrderItem, OrderStatus } from '@/modules/order/domain/order.entity';
import { success } from '@/core/utils/result';
import { CreateOrderUseCase } from '@/modules/order/application/use-cases/create-order.usecase';
import { GetOrderUseCase } from '@/modules/order/application/use-cases/get-order.usecase';
import { FindAllOrdersUseCase } from '@/modules/order/application/use-cases/find-all-orders.usecase';
import { UpdateOrderUseCase } from '@/modules/order/application/use-cases/update-order.usecase';
import { DeleteOrderUseCase } from '@/modules/order/application/use-cases/delete-order.usecase';
import { ConfirmOrderUseCase } from '@/modules/order/application/use-cases/confirm-order.usecase';
import { CancelOrderUseCase } from '@/modules/order/application/use-cases/cancel-order.usecase';

// Mock the use cases
const mockCreateOrderUseCase = mock<CreateOrderUseCase>();
const mockGetOrderUseCase = mock<GetOrderUseCase>();
const mockFindAllOrdersUseCase = mock<FindAllOrdersUseCase>();
const mockUpdateOrderUseCase = mock<UpdateOrderUseCase>();
const mockDeleteOrderUseCase = mock<DeleteOrderUseCase>();
const mockConfirmOrderUseCase = mock<ConfirmOrderUseCase>();
const mockCancelOrderUseCase = mock<CancelOrderUseCase>();

// Mock the modules that instantiate the use cases and repositories
jest.mock('@/modules/order/infrastructure/prisma-order.repository');
jest.mock('@/modules/user/infrastructure/prisma-user.repository');

jest.mock('@/modules/order/application/use-cases/create-order.usecase', () => ({
  CreateOrderUseCase: jest.fn().mockImplementation(() => mockCreateOrderUseCase),
}));
jest.mock('@/modules/order/application/use-cases/get-order.usecase', () => ({
  GetOrderUseCase: jest.fn().mockImplementation(() => mockGetOrderUseCase),
}));
jest.mock('@/modules/order/application/use-cases/find-all-orders.usecase', () => ({
  FindAllOrdersUseCase: jest.fn().mockImplementation(() => mockFindAllOrdersUseCase),
}));
jest.mock('@/modules/order/application/use-cases/update-order.usecase', () => ({
  UpdateOrderUseCase: jest.fn().mockImplementation(() => mockUpdateOrderUseCase),
}));
jest.mock('@/modules/order/application/use-cases/delete-order.usecase', () => ({
  DeleteOrderUseCase: jest.fn().mockImplementation(() => mockDeleteOrderUseCase),
}));
jest.mock('@/modules/order/application/use-cases/confirm-order.usecase', () => ({
  ConfirmOrderUseCase: jest.fn().mockImplementation(() => mockConfirmOrderUseCase),
}));
jest.mock('@/modules/order/application/use-cases/cancel-order.usecase', () => ({
  CancelOrderUseCase: jest.fn().mockImplementation(() => mockCancelOrderUseCase),
}));

import orderRoutes from '../order.routes';
import { Request, Response, NextFunction } from 'express';

jest.mock('@/core/middlewares/auth.middleware', () => ({
  isAuthenticated: jest.fn((req: Request, res: Response, next: NextFunction) => next()),
  hasRole: jest.fn(() => (req: Request, res: Response, next: NextFunction) => next()),
}));

const app = express();
app.use(express.json());
app.use('/api/v1/orders', orderRoutes);

describe('OrderController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const orderId = 'a1b2c3d4-e5f6-7890-1234-567890abcdef';
  const userId = 'a1b2c3d4-e5f6-7890-1234-567890abcdea';
  const orderItemResult = OrderItem.create({
    orderId: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    productId: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    quantity: 1,
    price: 100,
  });
  if (orderItemResult.isFailure() || !orderItemResult.value) {
    throw new Error('Test setup failed: could not create order item');
  }
  const orderItem = orderItemResult.value;

  const orderResult = Order.create({
    userId,
    items: [orderItem],
    status: OrderStatus.PENDING,
    total: 100,
  });

  if (orderResult.isFailure() || !orderResult.value) {
    throw new Error('Test setup failed: could not create order');
  }

  const order = orderResult.value;

  describe('POST /orders', () => {
    it('should create an order and return 201', async () => {
      mockCreateOrderUseCase.execute.mockResolvedValue(success(order));

      const response = await request(app)
        .post('/api/v1/orders')
        .send({
          userId,
          items: [{ productId: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', quantity: 1, price: 100 }],
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('GET /orders/:id', () => {
    it('should return an order and 200', async () => {
      mockGetOrderUseCase.execute.mockResolvedValue(success(order));

      const response = await request(app).get(`/api/v1/orders/${orderId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('GET /orders', () => {
    it('should return an array of orders and 200', async () => {
      mockFindAllOrdersUseCase.execute.mockResolvedValue(success([order]));

      const response = await request(app).get('/api/v1/orders').query({ userId });

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('PUT /orders/:id', () => {
    it('should update an order and return 200', async () => {
      mockUpdateOrderUseCase.execute.mockResolvedValue(success(order));

      const response = await request(app)
        .put(`/api/v1/orders/${orderId}`)
        .send({
          status: OrderStatus.PAID,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('DELETE /orders/:id', () => {
    it('should delete an order and return 204', async () => {
      mockDeleteOrderUseCase.execute.mockResolvedValue(success(undefined));

      const response = await request(app).delete(`/api/v1/orders/${orderId}`);

      expect(response.status).toBe(204);
    });
  });

  describe('POST /orders/:id/confirm', () => {
    it('should confirm an order and return 200', async () => {
      mockConfirmOrderUseCase.execute.mockResolvedValue(success(order));

      const response = await request(app).post(`/api/v1/orders/${orderId}/confirm`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('POST /orders/:id/cancel', () => {
    it('should cancel an order and return 200', async () => {
      mockCancelOrderUseCase.execute.mockResolvedValue(success(order));

      const response = await request(app).post(`/api/v1/orders/${orderId}/cancel`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
  });
});
