import request from 'supertest';
import App from '@/app';
import prisma from '@/infrastructure/database/prisma/prisma-client';
import { User, UserRole, DiscountType } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

let app: App;
let authenticatedUser: User;

// Mock the auth middleware
jest.mock('@/core/middlewares/auth.middleware', () => ({
  ...jest.requireActual('@/core/middlewares/auth.middleware'),
  isAuthenticated: jest.fn((req, res, next) => {
    req.user = authenticatedUser;
    next();
  }),
  hasRole: (roles: UserRole[]) => (req: any, res: any, next: any) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  },
}));


describe('Promotion API', () => {
  beforeAll(() => {
    app = new App(prisma);
  });

  beforeEach(async () => {
    authenticatedUser = {
      id: 'test-user-id',
      email: 'test@example.com',
      password: 'password',
      role: UserRole.ADMIN,
      created_at: new Date(),
      updated_at: new Date(),
    };
    await prisma.promotion.deleteMany();
  });

  afterAll(async () => {
    await prisma.promotion.deleteMany();
    await prisma.$disconnect();
  });

  describe('POST /promotions', () => {
    it('should create a new promotion', async () => {
      const promotionData = {
        code: 'SUMMER20',
        name: 'Summer Sale',
        description: 'Get 20% off on all products',
        discount_type: DiscountType.PERCENTAGE,
        discount_value: 20,
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        max_uses: 100,
      };

      const response = await request(app.getServer())
        .post('/api/v1/promotions')
        .send(promotionData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(promotionData.name);
    });

    it('should return 422 for invalid date range', async () => {
      const promotionData = {
        code: 'INVALID20',
        name: 'Invalid Sale',
        description: 'This sale has an invalid date range',
        discount_type: DiscountType.PERCENTAGE,
        discount_value: 10,
        start_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        end_date: new Date().toISOString(),
        max_uses: 100,
      };

      const response = await request(app.getServer())
        .post('/api/v1/promotions')
        .send(promotionData);

      expect(response.status).toBe(422);
    });
  });

  describe('GET /promotions', () => {
    it('should return a list of promotions', async () => {
      await prisma.promotion.create({
        data: {
          code: 'GETPROMO',
          name: 'Test Promotion',
          discount_type: DiscountType.FIXED_AMOUNT,
          discount_value: 10,
          start_date: new Date(),
          end_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
          max_uses: 100,
        },
      });

      const response = await request(app.getServer()).get('/api/v1/promotions');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /promotions/:id', () => {
    it('should return a single promotion', async () => {
      const promotion = await prisma.promotion.create({
        data: {
          code: 'GETONE',
          name: 'Single Promotion',
          discount_type: DiscountType.PERCENTAGE,
          discount_value: 15,
          start_date: new Date(),
          end_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
          max_uses: 50,
        },
      });

      const response = await request(app.getServer()).get(
        `/api/v1/promotions/${promotion.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(promotion.id);
    });

    it('should return 404 for a non-existent promotion', async () => {
      const response = await request(app.getServer()).get(
        '/api/v1/promotions/non-existent-id',
      );

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /promotions/:id', () => {
    it('should update a promotion', async () => {
      const promotion = await prisma.promotion.create({
        data: {
          code: 'UPDATE',
          name: 'Old Name',
          discount_type: DiscountType.FIXED_AMOUNT,
          discount_value: 5,
          start_date: new Date(),
          end_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
          max_uses: 10,
        },
      });

      const updatedData = {
        name: 'New Name',
        discount_value: 10,
      };

      const response = await request(app.getServer())
        .put(`/api/v1/promotions/${promotion.id}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(updatedData.name);
      expect(response.body.discount_value).toBe(updatedData.discount_value);
    });
  });

  describe('DELETE /promotions/:id', () => {
    it('should delete a promotion', async () => {
      const promotion = await prisma.promotion.create({
        data: {
          code: 'DELETE',
          name: 'To be deleted',
          discount_type: DiscountType.PERCENTAGE,
          discount_value: 50,
          start_date: new Date(),
          end_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
          max_uses: 1,
        },
      });

      const response = await request(app.getServer()).delete(
        `/api/v1/promotions/${promotion.id}`,
      );

      expect(response.status).toBe(204);

      const findDeleted = await prisma.promotion.findUnique({
        where: { id: promotion.id },
      });
      expect(findDeleted).toBeNull();
    });
  });
});
