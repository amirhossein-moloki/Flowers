import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient, ServiceZone, ShippingRate } from '@prisma/client';
import { User, UserRole } from '@/modules/user/domain/user.entity';
import App from '@/app';
import { execSync } from 'child_process';
import { env } from '@/config/env';

// Define a custom request type for our tests
interface AuthenticatedRequest extends Request {
  user?: User;
}

// This variable will be used by our mock to determine the user for each test
let mockUser: User | undefined = undefined;

// Mock the entire auth middleware module. Jest hoists this to the top of the file,
// so it runs before any imports, ensuring the App is built with our mock middleware.
jest.mock('@/core/middlewares/auth.middleware', () => ({
  isAuthenticated: (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    req.user = mockUser; // Inject the mock user into the request
    if (req.user) {
      return next();
    }
    return res.status(401).json({ message: 'Unauthorized' });
  },
  hasRole: (roles: UserRole[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // This mock uses the user that was injected by the mocked 'isAuthenticated'
    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    return next();
  },
}));

describe('ShippingRate Integration Tests', () => {
  let app: express.Application;
  let prisma: PrismaClient;
  let serviceZone: ServiceZone;
  let shippingRate: ShippingRate;
  let server: any;
  let vendor: any;

  const adminUserResult = User.create({
    username: 'admin',
    email: 'admin@example.com',
    password: 'password',
    role: UserRole.ADMIN,
  }, 'admin-user-id');
  if (!adminUserResult.success) throw new Error('Failed to create admin user');
  const adminUser = adminUserResult.value;

  const customerUserResult = User.create({
    username: 'customer',
    email: 'customer@example.com',
    password: 'password',
    role: UserRole.CUSTOMER,
  }, 'customer-user-id');
  if (!customerUserResult.success) throw new Error('Failed to create customer user');
  const customerUser = customerUserResult.value;

  beforeAll(async () => {
    execSync('npx prisma migrate reset --force --schema=src/infrastructure/database/prisma/schema.prisma');
    prisma = new PrismaClient();
    await prisma.$connect();
    const application = new App(prisma);
    app = application.getServer();
    server = application.start(env.PORT);
  });

  beforeEach(async () => {
    mockUser = undefined; // Reset the user before each test
    await prisma.shippingRate.deleteMany({});
    await prisma.serviceZone.deleteMany({});
    await prisma.vendor.deleteMany({});
    vendor = await prisma.vendor.create({
      data: {
        name: 'Test Vendor',
        email: 'vendor@test.com',
        phone: '1234567890',
        address: '123 Test St',
      },
    });
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
    await new Promise<void>((resolve) => server.close(() => resolve()));
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
