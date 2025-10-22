import request from 'supertest';
import App from '@/app';
import { Server } from 'http';
import { PrismaClient } from '@prisma/client';

describe('DeliveryStatus Integration Tests', () => {
  let server: Server;
  let app: App;
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
    app = new App(prisma);
    server = app.start(3002);
  });

  beforeEach(async () => {
    await prisma.deliveryStatus.deleteMany({});
    await prisma.delivery.deleteMany({});
  });

  afterAll(async () => {
    await prisma.deliveryStatus.deleteMany({});
    await prisma.delivery.deleteMany({});
    await prisma.$disconnect();
    server.close();
  });

  describe('GET /api/v1/delivery-status', () => {
    it('should return a list of delivery statuses for a given delivery', async () => {
      // Arrange
      const delivery = await prisma.delivery.create({
        data: {
          order_id: 'order-1',
          courier_id: 'courier-1',
          assigned_at: new Date(),
          expected_delivery_date: new Date(),
          tracking_number: 'tracking-1',
        },
      });
      await prisma.deliveryStatus.create({
        data: {
          delivery_id: delivery.id,
          status: 'PENDING',
        },
      });

      // Act
      const response = await request(server).get('/api/v1/delivery-status');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].status).toBe('PENDING');
    });
  });

  describe('GET /api/v1/delivery-status/:id', () => {
    it('should return a delivery status by id', async () => {
      // Arrange
      const delivery = await prisma.delivery.create({
        data: {
          order_id: 'order-1',
          courier_id: 'courier-1',
          assigned_at: new Date(),
          expected_delivery_date: new Date(),
          tracking_number: 'tracking-1',
        },
      });
      const deliveryStatus = await prisma.deliveryStatus.create({
        data: {
          delivery_id: delivery.id,
          status: 'PENDING',
        },
      });

      // Act
      const response = await request(server).get(`/api/v1/delivery-status/${deliveryStatus.id}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('PENDING');
    });

    it('should return 404 if delivery status not found', async () => {
      // Act
      const response = await request(server).get('/api/v1/delivery-status/non-existent-id');

      // Assert
      expect(response.status).toBe(404);
    });
  });
});
