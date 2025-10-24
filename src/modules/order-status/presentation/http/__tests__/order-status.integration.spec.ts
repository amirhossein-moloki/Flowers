import 'reflect-metadata';
import { jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import App from '@/app';
import prismaClient from '@/infrastructure/database/prisma/prisma-client';
import { OrderStatus } from '../../../domain/order-status.entity';

describe('OrderStatus API', () => {
  let app: express.Express;

  beforeEach(() => {
    jest.resetModules();
  });

  beforeAll(async () => {
    const application = new App(prismaClient);
    app = application.getServer();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  describe('GET /order-statuses', () => {
    it('should return a list of order statuses', async () => {
      // Act
      const response = await request(app).get('/api/v1/order-statuses');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(5);
      expect(response.body[0]).toHaveProperty('code', 'PENDING');
    });
  });

  describe('GET /order-statuses/:id', () => {
    it('should return an order status by id', async () => {
      // Act
      const response = await request(app).get(`/api/v1/order-statuses/PENDING`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('code', 'PENDING');
    });

    it('should return 404 if the order status does not exist', async () => {
      // Act
      const response = await request(app).get('/api/v1/order-statuses/non-existent-id');

      // Assert
      expect(response.status).toBe(404);
    });
  });
});
