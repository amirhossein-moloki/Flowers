import request from 'supertest';
import express from 'express';
import { PrismaClient, ServiceZone, ShippingRate, UserRole } from '@prisma/client';
import { User } from '@/modules/user/domain/user.entity';

// This variable will be used by our mock to determine the user for each test
let mockUser: User | null = null;

// Mock the entire auth middleware module. Jest hoists this to the top of the file,
// so it runs before any imports, ensuring the App is built with our mock middleware.
jest.mock('@/core/middlewares/auth.middleware', () => ({
  isAuthenticated: (req: any, res: any, next: any) => {
    req.user = mockUser; // Inject the mock user into the request
    if (req.user) {
      return next();
    }
    return res.status(401).json({ message: 'Unauthorized' });
  },
  hasRole: (roles: UserRole[]) => (req: any, res: any, next: any) => {
    // This mock uses the user that was injected by the mocked 'isAuthenticated'
    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    return next();
  },
}));

// Now, when we import App, it will automatically use our mocked middleware
import App from '@/app';

describe('ShippingRate Integration Tests', () => {
  let app: express.Application;
  let prisma: PrismaClient;
  let serviceZone: ServiceZone;
  let shippingRate: ShippingRate;

  const adminUser = new User({
    id: 'admin-user-id',
    username: 'admin',
    email: 'admin@example.com',
    password: 'password',
    role: UserRole.ADMIN,
  });

  const customerUser = new User({
    id: 'customer-user-id',
    username: 'customer',
    email: 'customer@example.com',
    password: 'password',
    role: UserRole.CUSTOMER,
  });

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
    const application = new App(prisma);
    app = application.getServer();
  });

  beforeEach(async () => {
    mockUser = null; // Reset the user before each test
    await prisma.shippingRate.deleteMany({});
    await prisma.serviceZone.deleteMany({});
    serviceZone = await prisma.serviceZone.create({
      data: { name: 'Test Zone', geo_json: '{}' },
    });
    shippingRate = await prisma.shippingRate.create({
      data: {
        rate: 10.5,
        currency: 'USD',
        min_weight: 0.1,
        max_weight: 5.0,
        service_zone_id: serviceZone.id,
        weight_unit: 'kg',
      },
    });
  });

  afterAll(async () => {
    await prisma.shippingRate.deleteMany({});
    await prisma.serviceZone.deleteMany({});
    await prisma.$disconnect();
  });

  describe('POST /api/v1/shipping-rates', () => {
    it('should return 201 for an admin', async () => {
      mockUser = adminUser;
      const response = await request(app).post('/api/v1/shipping-rates').send({
        rate: 15.0,
        currency: 'EUR',
        min_weight: 0.2,
        max_weight: 6.0,
        service_zone_id: serviceZone.id,
        weight_unit: 'kg',
      });
      expect(response.status).toBe(201);
    });

    it('should return 403 for a non-admin user', async () => {
      mockUser = customerUser;
      const response = await request(app).post('/api/v1/shipping-rates').send({});
      expect(response.status).toBe(403);
    });

    it('should return 401 for an unauthenticated user', async () => {
      mockUser = null;
      const response = await request(app).post('/api/v1/shipping-rates').send({});
      expect(response.status).toBe(401);
    });
  });

  describe('PUT /api/v1/shipping-rates/:id', () => {
    it('should return 200 for an admin', async () => {
      mockUser = adminUser;
      const response = await request(app).put(`/api/v1/shipping-rates/${shippingRate.id}`).send({ rate: 12.0 });
      expect(response.status).toBe(200);
    });

    it('should return 403 for a non-admin user', async () => {
      mockUser = customerUser;
      const response = await request(app).put(`/api/v1/shipping-rates/${shippingRate.id}`).send({ rate: 12.0 });
      expect(response.status).toBe(403);
    });
  });

  describe('DELETE /api/v1/shipping-rates/:id', () => {
    it('should return 204 for an admin', async () => {
      mockUser = adminUser;
      const response = await request(app).delete(`/api/v1/shipping-rates/${shippingRate.id}`);
      expect(response.status).toBe(204);
    });

    it('should return 403 for a non-admin user', async () => {
      mockUser = customerUser;
      const response = await request(app).delete(`/api/v1/shipping-rates/${shippingRate.id}`);
      expect(response.status).toBe(403);
    });
  });

  describe('GET /api/v1/shipping-rates', () => {
    it('should return 200 for an authenticated user', async () => {
      mockUser = customerUser;
      const response = await request(app).get('/api/v1/shipping-rates');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });

    it('should return 401 for an unauthenticated user', async () => {
      mockUser = null;
      const response = await request(app).get('/api/v1/shipping-rates');
      expect(response.status).toBe(401);
    });
  });
});
