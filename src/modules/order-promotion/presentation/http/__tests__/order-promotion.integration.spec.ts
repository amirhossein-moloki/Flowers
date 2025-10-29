import request from 'supertest';
import App from '@/app';
import prisma from '@/infrastructure/database/prisma/prisma-client';
import { User } from '@/modules/user/domain/user.entity';
import { UserRole } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { isAuthenticated } from '@/core/middlewares/auth.middleware';
import { Request, Response, NextFunction } from 'express';

jest.mock('@/core/middlewares/auth.middleware', () => ({
  isAuthenticated: jest.fn((req: Request, res: Response, next: NextFunction) => next()),
  hasRole: jest.fn(() => (req: Request, res: Response, next: NextFunction) => next()),
}));

describe('Order-Promotion Integration Tests', () => {
  let app: App;
  let user: any;
  let admin: any;
  let accessToken: string;
  let adminAccessToken: string;

  beforeAll(async () => {
    app = new App(prisma);

    user = await prisma.user.create({
      data: {
        email: 'user-order-promotion@example.com',
        username: 'user-order-promotion',
        password: 'password123',
        role: UserRole.CUSTOMER,
      },
    });

    admin = await prisma.user.create({
      data: {
        email: 'admin-order-promotion@example.com',
        username: 'admin-order-promotion',
        password: 'password123',
        role: UserRole.ADMIN,
      },
    });
  });

  afterAll(async () => {
    await prisma.payment.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.user.deleteMany({
      where: { id: { in: [user.id, admin.id] } },
    });
    await prisma.$disconnect();
  });

  let order: any;
  let promotion: any;

  beforeEach(async () => {
    (isAuthenticated as jest.Mock).mockClear();
    await prisma.orderPromotion.deleteMany();
    await prisma.promotion.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    order = await prisma.order.create({
      data: {
        status: 'PENDING',
        total: 100,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    promotion = await prisma.promotion.create({
      data: {
        name: 'PROMO123',
        code: 'PROMO123',
        discount_type: 'PERCENTAGE',
        discount_value: 10,
        start_date: new Date(),
        end_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
        is_active: true,
      },
    });
  });

  describe('POST /api/v1/order-promotions', () => {
    it('should create a new order promotion and return 201', async () => {
      (isAuthenticated as jest.Mock).mockImplementation((req, res, next) => {
        req.user = admin;
        next();
      });

      const response = await request(app.getServer())
        .post('/api/v1/order-promotions')
        .send({
          order_id: order.id,
          promotion_id: promotion.id,
          discount_applied: 10,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.order_id).toBe(order.id);
      expect(response.body.promotion_id).toBe(promotion.id);
    });

    it('should return 401 for unauthorized user', async () => {
      (isAuthenticated as jest.Mock).mockImplementation((req, res, next) => {
        return res.status(401).json({ message: 'Unauthorized' });
      });

      const response = await request(app.getServer())
        .post('/api/v1/order-promotions')
        .send({
          order_id: order.id,
          promotion_id: promotion.id,
          discount_applied: 10,
        });

      expect(response.status).toBe(401);
    });

    it('should return 400 for invalid data', async () => {
      (isAuthenticated as jest.Mock).mockImplementation((req, res, next) => {
        req.user = admin;
        next();
      });

      const response = await request(app.getServer())
        .post('/api/v1/order-promotions')
        .send({
          order_id: 'invalid-uuid',
          promotion_id: promotion.id,
          discount_applied: -10,
        });

      expect(response.status).toBe(422);
    });
  });

  describe('GET /api/v1/order-promotions/:id', () => {
    it('should get an order promotion by id and return 200', async () => {
      (isAuthenticated as jest.Mock).mockImplementation((req, res, next) => {
        req.user = user;
        next();
      });
      const orderPromotion = await prisma.orderPromotion.create({
        data: {
          order_id: order.id,
          promotion_id: promotion.id,
          discount_applied: 10,
        },
      });

      const response = await request(app.getServer()).get(
        `/api/v1/order-promotions/${orderPromotion.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(orderPromotion.id);
    });

    it('should return 404 for non-existent id', async () => {
      (isAuthenticated as jest.Mock).mockImplementation((req, res, next) => {
        req.user = user;
        next();
      });
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      const response = await request(app.getServer()).get(
        `/api/v1/order-promotions/${nonExistentId}`,
      );

      expect(response.status).toBe(404);
    });

    it('should return 401 for unauthorized user', async () => {
      (isAuthenticated as jest.Mock).mockImplementation((req, res, next) => {
        return res.status(401).json({ message: 'Unauthorized' });
      });
      const response = await request(app.getServer()).get('/api/v1/order-promotions/some-id');

      expect(response.status).toBe(401);
    });
  });

  describe('PUT /api/v1/order-promotions/:id', () => {
    it('should update an order promotion and return 200', async () => {
      (isAuthenticated as jest.Mock).mockImplementation((req, res, next) => {
        req.user = admin;
        next();
      });
      const orderPromotion = await prisma.orderPromotion.create({
        data: {
          order_id: order.id,
          promotion_id: promotion.id,
          discount_applied: 10,
        },
      });

      const response = await request(app.getServer())
        .put(`/api/v1/order-promotions/${orderPromotion.id}`)
        .send({ discount_applied: 20 });

      expect(response.status).toBe(200);
      expect(response.body.discount_applied).toBe(20);
    });

    it('should return 404 for non-existent id', async () => {
      (isAuthenticated as jest.Mock).mockImplementation((req, res, next) => {
        req.user = admin;
        next();
      });
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      const response = await request(app.getServer())
        .put(`/api/v1/order-promotions/${nonExistentId}`)
        .send({ discount_applied: 20 });

      expect(response.status).toBe(404);
    });

    it('should return 400 for invalid data', async () => {
      (isAuthenticated as jest.Mock).mockImplementation((req, res, next) => {
        req.user = admin;
        next();
      });
      const orderPromotion = await prisma.orderPromotion.create({
        data: {
          order_id: order.id,
          promotion_id: promotion.id,
          discount_applied: 10,
        },
      });

      const response = await request(app.getServer())
        .put(`/api/v1/order-promotions/${orderPromotion.id}`)
        .send({ discount_applied: -20 });

      expect(response.status).toBe(422);
    });

    it('should return 401 for unauthorized user', async () => {
      (isAuthenticated as jest.Mock).mockImplementation((req, res, next) => {
        return res.status(401).json({ message: 'Unauthorized' });
      });
      const response = await request(app.getServer())
        .put('/api/v1/order-promotions/some-id')
        .send({ discount_applied: 20 });

      expect(response.status).toBe(401);
    });
  });

  describe('DELETE /api/v1/order-promotions/:id', () => {
    it('should delete an order promotion and return 204', async () => {
      (isAuthenticated as jest.Mock).mockImplementation((req, res, next) => {
        req.user = admin;
        next();
      });
      const orderPromotion = await prisma.orderPromotion.create({
        data: {
          order_id: order.id,
          promotion_id: promotion.id,
          discount_applied: 10,
        },
      });

      const response = await request(app.getServer()).delete(
        `/api/v1/order-promotions/${orderPromotion.id}`,
      );

      expect(response.status).toBe(204);

      const deletedOrderPromotion = await prisma.orderPromotion.findUnique({
        where: { id: orderPromotion.id },
      });
      expect(deletedOrderPromotion).toBeNull();
    });

    it('should return 404 for non-existent id', async () => {
      (isAuthenticated as jest.Mock).mockImplementation((req, res, next) => {
        req.user = admin;
        next();
      });
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      const response = await request(app.getServer()).delete(
        `/api/v1/order-promotions/${nonExistentId}`,
      );

      expect(response.status).toBe(404);
    });

    it('should return 401 for unauthorized user', async () => {
      (isAuthenticated as jest.Mock).mockImplementation((req, res, next) => {
        return res.status(401).json({ message: 'Unauthorized' });
      });
      const response = await request(app.getServer()).delete('/api/v1/order-promotions/some-id');

      expect(response.status).toBe(401);
    });
  });
});
