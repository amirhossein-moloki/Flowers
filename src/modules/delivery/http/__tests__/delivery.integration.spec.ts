import request from 'supertest';
import { PrismaClient, UserRole } from '@prisma/client';
import App from '@/app';
import { randomUUID } from 'crypto';
import { VehicleType } from '@/core/domain/enums';

const appInstance = new App(new PrismaClient());
const app = appInstance.getServer();

describe('Delivery Integration Tests', () => {
  let prisma: PrismaClient;
  let user: any;
  let order: any;
  let courier: any;
  const statusId = randomUUID();

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.delivery.deleteMany({});
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.courier.deleteMany({});
    await prisma.deliveryStatus.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.vendorOutlet.deleteMany({});
    await prisma.vendor.deleteMany({});

    user = await prisma.user.create({
      data: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: UserRole.CUSTOMER,
      },
    });

    const vendor = await prisma.vendor.create({
      data: {
        name: 'Test Vendor',
        email: `vendor-${randomUUID()}@example.com`,
        phone: `1234567890-${randomUUID()}`,
        address: '123 Test St',
      },
    });

    const product = await prisma.product.create({
      data: {
        name: 'Test Product',
        price: 10.0,
        stock: 100,
        vendorId: vendor.id,
      },
    });

    order = await prisma.order.create({
      data: {
        userId: user.id,
        total: 10.0,
        items: {
          create: {
            productId: product.id,
            quantity: 1,
            price: 10.0,
          },
        },
      },
    });

    courier = await prisma.courier.create({
      data: {
        name: 'Test Courier',
        email: 'test@courier.com',
        phone: '1234567890',
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const isoDate = new Date().toISOString();

  const validDelivery = {
    order_id: '', // Will be replaced in the test
    courier_id: '', // Will be replaced in the test
    status_id: statusId,
    vehicle_type: VehicleType.MOTORCYCLE,
    assigned_at: isoDate,
    pickup_at: isoDate,
    dropoff_at: isoDate,
    distance_meters: 5000,
    eta_seconds: 1800,
    failure_reason: 'none',
    expected_delivery_date: isoDate,
    tracking_number: () => randomUUID(),
  };

  describe('POST /api/v1/deliveries', () => {
    it('should create a new delivery with valid data', async () => {
      const deliveryData = {
        ...validDelivery,
        order_id: order.id,
        courier_id: courier.id,
        tracking_number: validDelivery.tracking_number(),
      };

      const response = await request(app)
        .post('/api/v1/deliveries')
        .send(deliveryData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.order_id).toBe(order.id);
    });

    it('should return a 422 error for missing required fields', async () => {
      const response = await request(app)
        .post('/api/v1/deliveries')
        .send({});
      expect(response.status).toBe(422);
    });
  });

  describe('GET /api/v1/deliveries', () => {
    it('should list all deliveries', async () => {
      const response = await request(app).get('/api/v1/deliveries');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/v1/deliveries/:id', () => {
    it('should find a delivery by id', async () => {
      const delivery = await prisma.delivery.create({
        data: {
          order_id: order.id,
          courier_id: courier.id,
          status_id: statusId,
          assigned_at: isoDate,
          expected_delivery_date: isoDate,
          tracking_number: randomUUID(),
        },
      });

      const response = await request(app).get(`/api/v1/deliveries/${delivery.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', delivery.id);
    });

    it('should return 404 for a non-existent delivery', async () => {
      const response = await request(app).get(`/api/v1/deliveries/${randomUUID()}`);
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/v1/deliveries/:id', () => {
    it('should update a delivery with valid data', async () => {
      const delivery = await prisma.delivery.create({
        data: {
          order_id: order.id,
          courier_id: courier.id,
          status_id: statusId,
          assigned_at: isoDate,
          expected_delivery_date: isoDate,
          tracking_number: randomUUID(),
        },
      });

      const response = await request(app)
        .put(`/api/v1/deliveries/${delivery.id}`)
        .send({ distance_meters: 6000 });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('distance_meters', 6000);
    });

    it('should return 404 for a non-existent delivery', async () => {
      const response = await request(app)
        .put(`/api/v1/deliveries/${randomUUID()}`)
        .send({ distance_meters: 6000 });
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/v1/deliveries/:id', () => {
    it('should delete a delivery', async () => {
      const delivery = await prisma.delivery.create({
        data: {
          order_id: order.id,
          courier_id: courier.id,
          status_id: statusId,
          assigned_at: isoDate,
          expected_delivery_date: isoDate,
          tracking_number: randomUUID(),
        },
      });

      const response = await request(app).delete(`/api/v1/deliveries/${delivery.id}`);
      expect(response.status).toBe(204);
    });

    it('should return 404 for a non-existent delivery', async () => {
      const response = await request(app).delete(`/api/v1/deliveries/${randomUUID()}`);
      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/v1/deliveries/:id/assign-driver', () => {
    it('should assign a driver to a delivery', async () => {
      const delivery = await prisma.delivery.create({
        data: {
          order_id: order.id,
          courier_id: courier.id,
          status_id: statusId,
          assigned_at: isoDate,
          expected_delivery_date: isoDate,
          tracking_number: randomUUID(),
        },
      });
      const response = await request(app).post(`/api/v1/deliveries/${delivery.id}/assign-driver`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: `Driver assigned to delivery ${delivery.id}` });
    });
  });
});
