import 'reflect-metadata';
import request from 'supertest';
import express from 'express';
import { mockDeep } from 'jest-mock-extended';
import { OrderStatus } from '../../../domain/order-status.entity';
import { createOrderStatusRoutes } from '../routes';
import { Dependencies } from '@/infrastructure/di';
import { success } from '@/core/utils/result';

describe('OrderStatusController', () => {
  let app: express.Express;
  let dependencies: Partial<Dependencies>;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    dependencies = {
      getAllOrderStatusesUseCase: {
        execute: jest.fn().mockResolvedValue(success([])),
      },
      getOrderStatusUseCase: {
        execute: jest.fn().mockResolvedValue(success(null)),
      },
    };

    const orderStatusRoutes = createOrderStatusRoutes(dependencies as Dependencies);
    app.use('/order-statuses', orderStatusRoutes);
  });

  describe('GET /order-statuses', () => {
    it('should return a list of order statuses', async () => {
      const orderStatuses = [
        OrderStatus.create({ code: 'pending', name: 'Pending', display_order: 1 }).value,
        OrderStatus.create({ code: 'processing', name: 'Processing', display_order: 2 }).value,
      ];
      (dependencies.getAllOrderStatusesUseCase.execute as jest.Mock).mockResolvedValue(success(orderStatuses));

      const response = await request(app).get('/order-statuses');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].code).toBe('pending');
    });
  });

  describe('GET /order-statuses/:id', () => {
    it('should return an order status by id', async () => {
      const orderStatus = OrderStatus.create({ code: 'pending', name: 'Pending', display_order: 1 }).value;
      (dependencies.getOrderStatusUseCase.execute as jest.Mock).mockResolvedValue(success(orderStatus));

      const response = await request(app).get(`/order-statuses/${orderStatus.id}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(orderStatus.id);
      expect(response.body.code).toBe('pending');
    });

    it('should return 404 if order status not found', async () => {
      (dependencies.getOrderStatusUseCase.execute as jest.Mock).mockResolvedValue(success(null));

      const response = await request(app).get('/order-statuses/123');

      expect(response.status).toBe(404);
    });
  });
});
