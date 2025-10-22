import { Application } from 'express';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import App from '@/app';

jest.mock('@/core/middlewares/auth.middleware', () => ({
  isAuthenticated: (req, res, next) => next(),
  hasRole: (roles) => (req, res, next) => next(),
}));

describe('DriverLocation API', () => {
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
    await prisma.driverLocation.deleteMany({});
    await prisma.delivery.deleteMany({});
    await prisma.courier.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.user.deleteMany({});
  });

  describe('POST /api/v1/driver-locations', () => {
    it('should create a new driver location', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          username: 'test',
          password: 'password',
        },
      });

      const order = await prisma.order.create({
        data: {
          userId: user.id,
          total: 100,
        },
      });

      const courier = await prisma.courier.create({
        data: {
          name: 'Test Courier',
          email: 'test.courier@example.com',
          phone: '1234567890',
        },
      });

      const delivery = await prisma.delivery.create({
        data: {
          order_id: order.id,
          courier_id: courier.id,
          assigned_at: new Date(),
          expected_delivery_date: new Date(),
          tracking_number: '12345',
        },
      });

      const response = await request(server)
        .post('/api/v1/driver-locations')
        .send({
          delivery_id: delivery.id,
          courier_id: courier.id,
          lat: 12.34,
          lng: 56.78,
          speed_kmh: 60,
          heading_deg: 180,
          recorded_at: new Date().toISOString(),
        });

      expect(response.status).toBe(201);
      expect(response.body.lat).toBe(12.34);
    });

    it('should return 422 for invalid data', async () => {
      const response = await request(server)
        .post('/api/v1/driver-locations')
        .send({
          lat: 12.34,
        });

      expect(response.status).toBe(422);
    });
  });

  describe('GET /api/v1/driver-locations/:id', () => {
    it('should return a driver location by id', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          username: 'test',
          password: 'password',
        },
      });

      const order = await prisma.order.create({
        data: {
          userId: user.id,
          total: 100,
        },
      });

      const courier = await prisma.courier.create({
        data: {
          name: 'Test Courier',
          email: 'test.courier@example.com',
          phone: '1234567890',
        },
      });

      const delivery = await prisma.delivery.create({
        data: {
          order_id: order.id,
          courier_id: courier.id,
          assigned_at: new Date(),
          expected_delivery_date: new Date(),
          tracking_number: '12345',
        },
      });

      const driverLocation = await prisma.driverLocation.create({
        data: {
          delivery_id: delivery.id,
          courier_id: courier.id,
          lat: 12.34,
          lng: 56.78,
          speed_kmh: 60,
          heading_deg: 180,
          recorded_at: new Date(),
        },
      });

      const response = await request(server).get(`/api/v1/driver-locations/${driverLocation.id}`);
      expect(response.status).toBe(200);
      expect(response.body.lat).toBe(12.34);
    });

    it('should return 404 for a non-existent driver location', async () => {
      const response = await request(server).get('/api/v1/driver-locations/non-existent-id');
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/v1/driver-locations/:id', () => {
    it('should update a driver location', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          username: 'test',
          password: 'password',
        },
      });

      const order = await prisma.order.create({
        data: {
          userId: user.id,
          total: 100,
        },
      });

      const courier = await prisma.courier.create({
        data: {
          name: 'Test Courier',
          email: 'test.courier@example.com',
          phone: '1234567890',
        },
      });

      const delivery = await prisma.delivery.create({
        data: {
          order_id: order.id,
          courier_id: courier.id,
          assigned_at: new Date(),
          expected_delivery_date: new Date(),
          tracking_number: '12345',
        },
      });

      const driverLocation = await prisma.driverLocation.create({
        data: {
          delivery_id: delivery.id,
          courier_id: courier.id,
          lat: 12.34,
          lng: 56.78,
          speed_kmh: 60,
          heading_deg: 180,
          recorded_at: new Date(),
        },
      });

      const response = await request(server)
        .put(`/api/v1/driver-locations/${driverLocation.id}`)
        .send({
          lat: 43.21,
        });

      expect(response.status).toBe(200);
      expect(response.body.lat).toBe(43.21);
    });
  });

  describe('DELETE /api/v1/driver-locations/:id', () => {
    it('should delete a driver location', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          username: 'test',
          password: 'password',
        },
      });

      const order = await prisma.order.create({
        data: {
          userId: user.id,
          total: 100,
        },
      });

      const courier = await prisma.courier.create({
        data: {
          name: 'Test Courier',
          email: 'test.courier@example.com',
          phone: '1234567890',
        },
      });

      const delivery = await prisma.delivery.create({
        data: {
          order_id: order.id,
          courier_id: courier.id,
          assigned_at: new Date(),
          expected_delivery_date: new Date(),
          tracking_number: '12345',
        },
      });

      const driverLocation = await prisma.driverLocation.create({
        data: {
          delivery_id: delivery.id,
          courier_id: courier.id,
          lat: 12.34,
          lng: 56.78,
          speed_kmh: 60,
          heading_deg: 180,
          recorded_at: new Date(),
        },
      });

      const response = await request(server).delete(`/api/v1/driver-locations/${driverLocation.id}`);
      expect(response.status).toBe(204);
    });
  });
});
