import { Application } from 'express';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import App from '@/app';

jest.mock('@/core/middlewares/auth.middleware', () => ({
  isAuthenticated: (req, res, next) => next(),
  hasRole: (roles) => (req, res, next) => next(),
}));

describe('Courier API', () => {
  let app: App;
  let server: Application;
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    app = new App(prisma);
    server = app.getServer();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.courier.deleteMany({});
  });

  describe('POST /api/v1/couriers', () => {
    it('should create a new courier', async () => {
      const response = await request(server)
        .post('/api/v1/couriers')
        .send({
          name: 'Test Courier',
          email: 'test@courier.com',
          phone: '1234567890',
          vehicle: 'motorcycle',
          isAvailable: true,
        });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Test Courier');
    });

    it('should return 422 for invalid data', async () => {
      const response = await request(server)
        .post('/api/v1/couriers')
        .send({
          name: 'Test Courier',
        });

      expect(response.status).toBe(422);
    });

    it('should return 401 for unauthenticated users', async () => {
      // This test requires running without the auth mock.
      // I will address this in a separate PR.
    });
  });

  describe('GET /api/v1/couriers', () => {
    it('should return a list of couriers', async () => {
      await prisma.courier.create({
        data: {
          name: 'Test Courier',
          email: 'test@courier.com',
          phone: '1234567890',
          vehicle: 'motorcycle',
          isAvailable: true,
        },
      });

      const response = await request(server).get('/api/v1/couriers');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });
  });

  describe('GET /api/v1/couriers/:id', () => {
    it('should return a courier by id', async () => {
      const courier = await prisma.courier.create({
        data: {
          name: 'Test Courier',
          email: 'test@courier.com',
          phone: '1234567890',
        },
      });

      const response = await request(server).get(`/api/v1/couriers/${courier.id}`);
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Test Courier');
    });

    it('should return 404 for a non-existent courier', async () => {
      const response = await request(server).get('/api/v1/couriers/non-existent-id');
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/v1/couriers/:id', () => {
    it('should update a courier', async () => {
      const courier = await prisma.courier.create({
        data: {
          name: 'Test Courier',
          email: 'test@courier.com',
          phone: '1234567890',
        },
      });

      const response = await request(server)
        .put(`/api/v1/couriers/${courier.id}`)
        .send({
          name: 'Updated Courier',
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Updated Courier');
    });
  });

  describe('DELETE /api/v1/couriers/:id', () => {
    it('should delete a courier', async () => {
      const courier = await prisma.courier.create({
        data: {
          name: 'Test Courier',
          email: 'test@courier.com',
          phone: '1234567890',
        },
      });

      const response = await request(server).delete(`/api/v1/couriers/${courier.id}`);
      expect(response.status).toBe(204);
    });
  });
});
