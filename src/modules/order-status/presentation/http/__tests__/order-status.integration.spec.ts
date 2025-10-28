import 'reflect-metadata';
import { jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import App from '@/app';
import { prismaMock } from '@/modules/__tests__/helpers/prisma-mock.helper';
import { OrderStatus } from '../../../domain/order-status.entity';
import { Dependencies } from '@/infrastructure/di';
import { success } from '@/core/utils/result';
import { Router } from 'express';
import { PaymentController } from '@/modules/payment/presentation/http/payment.controller';
import { OrderController } from '@/modules/order/presentation/http/order.controller';

describe('OrderStatus API', () => {
  let app: express.Application;
  let dependencies: Partial<Dependencies>;

  beforeEach(() => {
    jest.resetModules();
    const pendingResult = OrderStatus.create({
      code: 'PENDING',
      name: 'Pending',
      display_order: 1,
    });
    const shippedResult = OrderStatus.create({
      code: 'SHIPPED',
      name: 'Shipped',
      display_order: 2,
    });

    if (!pendingResult.success || !shippedResult.success) {
      throw new Error('Test setup failed');
    }

    dependencies = {
      getAllOrderStatusesUseCase: {
        execute: jest
          .fn()
          .mockResolvedValue(success([pendingResult.value, shippedResult.value])),
      },
      getOrderStatusUseCase: {
        execute: jest.fn().mockResolvedValue(success(pendingResult.value)),
      },
      userRoutes: Router(),
      automationLogRoutes: Router(),
      paymentController: {
        router: Router(),
      } as any,
      orderRoutes: Router(),
    };
    const application = new App(prismaMock, dependencies as Dependencies);
    app = application.getServer();
  });

  describe('GET /order-statuses', () => {
    it('should return a list of order statuses', async () => {
      // Act
      const response = await request(app).get('/api/v1/order-statuses');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty('code', 'PENDING');
    });
  });

  describe('GET /order-statuses/:id', () => {
    it('should return an order status by id', async () => {
      // Act
      const response = await request(app).get(`/api/v1/order-statuses/1`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('code', 'PENDING');
    });

    it('should return 404 if the order status does not exist', async () => {
      (
        dependencies.getOrderStatusUseCase.execute as jest.Mock
      ).mockResolvedValue(success(null));
      // Act
      const response = await request(app).get(
        '/api/v1/order-statuses/non-existent-id',
      );

      // Assert
      expect(response.status).toBe(404);
    });
  });
});
