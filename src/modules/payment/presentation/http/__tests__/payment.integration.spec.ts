import request from 'supertest';
import prismaClient from '@/infrastructure/database/prisma/prisma-client';
import { Order, User } from '@prisma/client';
import App from '@/app';

let app: App;
let server: any;
let user: User;
let order: Order;

describe('Payment Integration Tests', () => {

  beforeAll(() => {
    app = new App(prismaClient);
    server = app.getServer();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  beforeEach(async () => {
    // Create a user and an order for testing
    user = await prismaClient.user.create({
      data: {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
      },
    });

    order = await prismaClient.order.create({
      data: {
        userId: user.id,
        total: 100,
        status: 'PENDING',
      },
    });
  });

  afterEach(async () => {
    await prismaClient.payment.deleteMany({});
    await prismaClient.order.deleteMany({});
    await prismaClient.user.deleteMany({});
  });

  describe('POST /api/v1/payments', () => {
    it('should create a new payment and return 201', async () => {
      const createPaymentDto = {
        orderId: order.id,
        amount: 100,
        method: 'ONLINE',
      };

      const response = await request(server)
        .post('/api/v1/payments')
        .send(createPaymentDto);

      expect(response.status).toBe(201);
      expect(response.body.order_id).toBe(order.id);
      expect(response.body.status).toBe('pending');
    });

    it('should return the same payment if the idempotency key is reused', async () => {
      const idempotencyKey = 'unique-key';
      const createPaymentDto = {
        orderId: order.id,
        amount: 100,
        method: 'ONLINE',
        idempotencyKey,
      };

      const response1 = await request(server)
        .post('/api/v1/payments')
        .send(createPaymentDto);

      expect(response1.status).toBe(201);

      const response2 = await request(server)
        .post('/api/v1/payments')
        .send(createPaymentDto);

      expect(response2.status).toBe(201);
      expect(response2.body.id).toBe(response1.body.id);
    });

    it.each([
      [{ amount: 100, method: 'ONLINE' }, 'orderId'],
      [{ orderId: '123', method: 'ONLINE' }, 'amount'],
      [{ orderId: '123', amount: 100 }, 'method'],
    ])('should return 422 if %s is missing', async (body, missingField) => {
      const response = await request(server)
        .post('/api/v1/payments')
        .send(body);

      expect(response.status).toBe(422);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('POST /api/v1/payments/verify', () => {
    it('should verify a payment and return 200', async () => {
      const payment = await prismaClient.payment.create({
        data: {
          order_id: order.id,
          amount: 100,
          method: 'ONLINE',
          status: 'PENDING',
          gateway: 'test',
          gateway_ref: 'test',
        },
      });

      const verifyPaymentDto = {
        paymentId: payment.id,
        verificationCode: '123456',
      };

      const response = await request(server)
        .post('/api/v1/payments/verify')
        .send(verifyPaymentDto);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('paid');
    });

    it('should return 404 if payment not found', async () => {
      const verifyPaymentDto = {
        paymentId: 'non-existent-id',
        verificationCode: '123456',
      };

      const response = await request(server)
        .post('/api/v1/payments/verify')
        .send(verifyPaymentDto);

      expect(response.status).toBe(404);
    });

    it.each([
      [{ verificationCode: '123' }, 'paymentId'],
      [{ paymentId: '123' }, 'verificationCode'],
    ])('should return 422 if %s is missing', async (body, missingField) => {
      const response = await request(server)
        .post('/api/v1/payments/verify')
        .send(body);

      expect(response.status).toBe(422);
      expect(response.body).toHaveProperty('errors');
    });
  });
});
