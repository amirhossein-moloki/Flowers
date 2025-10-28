import express from 'express';
import request from 'supertest';
import { mock } from 'jest-mock-extended';
import { Order } from '@/modules/order/domain/order.entity';
import { success } from '@/core/utils/result';
import { CreateOrderUseCase } from '@/modules/order/application/use-cases/create-order.usecase';
import { GetOrderUseCase } from '@/modules/order/application/use-cases/get-order.usecase';
import { FindAllOrdersUseCase } from '@/modules/order/application/use-cases/find-all-orders.usecase';
import { UpdateOrderUseCase } from '@/modules/order/application/use-cases/update-order.usecase';
import { DeleteOrderUseCase } from '@/modules/order/application/use-cases/delete-order.usecase';
import { ConfirmOrderUseCase } from '@/modules/order/application/use-cases/confirm-order.usecase';
import { CancelOrderUseCase } from '@/modules/order/application/use-cases/cancel-order.usecase';
import { OrderController } from '../order.controller';
import { createOrderRoutes } from '../order.routes';
import { OrderStatus, User, Product, Vendor } from '@prisma/client';
import { randomUUID } from 'crypto';
import { OrderItem } from '@/modules/order/domain/order-item.entity';
import { Entity } from '@/core/domain/entity';

// Mock the auth middleware
jest.mock('@/core/middlewares/auth.middleware', () => ({
  isAuthenticated: (req, res, next) => next(),
}));

// Mock the validate middleware
jest.mock('@/core/middlewares/validate.middleware', () => ({
    validate: () => (req, res, next) => next(),
}));

// Mock the use cases
const mockCreateOrderUseCase = mock<CreateOrderUseCase>();
const mockGetOrderUseCase = mock<GetOrderUseCase>();
const mockFindAllOrdersUseCase = mock<FindAllOrdersUseCase>();
const mockUpdateOrderUseCase = mock<UpdateOrderUseCase>();
const mockDeleteOrderUseCase = mock<DeleteOrderUseCase>();
const mockConfirmOrderUseCase = mock<ConfirmOrderUseCase>();
const mockCancelOrderUseCase = mock<CancelOrderUseCase>();

// Instantiate the controller with the mocked use cases
const orderController = new OrderController(
  mockCreateOrderUseCase,
  mockGetOrderUseCase,
  mockFindAllOrdersUseCase,
  mockUpdateOrderUseCase,
  mockDeleteOrderUseCase,
  mockConfirmOrderUseCase,
  mockCancelOrderUseCase,
);

// Create the router using the factory function
const orderRoutes = createOrderRoutes(orderController);

const app = express();
app.use(express.json());
app.use('/api/v1/orders', orderRoutes);

describe('OrderController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const orderItemResult = OrderItem.create({
    orderId: randomUUID(),
    productId: randomUUID(),
    quantity: 1,
    price: 100,
  });

  if (!orderItemResult.success) {
    throw orderItemResult.error;
  }

  const orderItem = orderItemResult.value;

  const orderResult = Order.create({
    userId: randomUUID(),
    items: [orderItem],
    status: OrderStatus.PENDING,
    total: 100,
  });

  if (!orderResult.success) {
    throw orderResult.error;
  }

  const order = orderResult.value;

  describe('POST /api/v1/orders', () => {
    it('should return an order and 201', async () => {
      mockCreateOrderUseCase.execute.mockResolvedValue(success(order));

      const response = await request(app).post('/api/v1/orders').send({
        userId: order.userId,
        items: order.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        total: order.total,
      });

      expect(response.status).toBe(201);
      expect(response.body.id).toBe(order.id);
    });
  });

  describe('GET /api/v1/orders/:id', () => {
    it('should return an order and 200', async () => {
      mockGetOrderUseCase.execute.mockResolvedValue(success(order));

      const response = await request(app).get(`/api/v1/orders/${order.id}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(order.id);
    });
  });
});
