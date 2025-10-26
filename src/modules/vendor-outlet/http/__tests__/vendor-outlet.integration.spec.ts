import request from 'supertest';
import App from '@/app';
import { PrismaClient } from '@prisma/client';
import { Dependencies } from '@/infrastructure/di';
import { IUserRepository } from '@/modules/user/domain/user.repository.interface';
import { User, UserRole } from '@/modules/user/domain/user.entity';
import { sign, verify } from 'jsonwebtoken';
import { env } from '@/config/env';
import { Vendor } from '@/modules/vendor/domain/vendor.entity';
import { VendorOutlet } from '@/modules/vendor-outlet/domain/vendor-outlet.entity';
import { execSync } from 'child_process';

jest.mock('@/core/middlewares/auth.middleware', () => ({
  ...jest.requireActual('@/core/middlewares/auth.middleware'),
  isAuthenticated: jest.fn((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = verify(token, env.JWT_SECRET);
      // @ts-ignore
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }),
}));

describe('Vendor Outlet Integration Tests', () => {
  let app: App;
  let prisma: PrismaClient;
  let dependencies: Dependencies;
  let adminToken: string;
  let adminUser: User;
  let testVendor: Vendor;
  let testVendorOutlet: VendorOutlet;
  let server: import('http').Server;

  beforeAll(async () => {
    execSync('npx prisma migrate reset --force --schema=src/infrastructure/database/prisma/schema.prisma');
    prisma = new PrismaClient();
    await prisma.$connect();
    app = new App(prisma);
    server = app.start(env.PORT);
    dependencies = app.dependencies;

    const adminResult = User.create({
      username: 'admin_vendor_outlet_test',
      email: 'admin_vendor_outlet_test@test.com',
      password: 'password123',
      role: UserRole.ADMIN,
      is_active: true,
    });

    if (!adminResult.success) {
      throw adminResult.error;
    }

    adminUser = adminResult.value;
    await dependencies.userRepository.save(adminUser);

    adminToken = sign({ id: adminUser.id, role: adminUser.role }, env.JWT_SECRET, { expiresIn: '1h' });

    const vendorResult = Vendor.create({
      name: 'Test Vendor',
      description: 'Test Description',
      email: `vendor${Math.floor(Math.random() * 10000)}@test.com`,
      phone: `+1555555${Math.floor(Math.random() * 10000)}`,
      address: '123 Test St',
    });

    if (!vendorResult.success) {
      throw vendorResult.error;
    }
    testVendor = vendorResult.value;
    await dependencies.vendorRepository.save(testVendor);

    const vendorOutletResult = VendorOutlet.create({
      vendorId: testVendor.id,
      name: 'Test Vendor Outlet',
      address: '456 Test St',
      latitude: 40.7128,
      longitude: -74.006,
      is_active: true,
    });

    if (!vendorOutletResult.success) {
      throw vendorOutletResult.error;
    }

    testVendorOutlet = vendorOutletResult.value;
    await dependencies.vendorOutletRepository.save(testVendorOutlet);
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  describe('POST /vendor-outlets', () => {
    it('should create a new vendor outlet and return 201', async () => {
      const newVendorOutletData = {
        vendorId: testVendor.id,
        name: 'New Vendor Outlet',
        address: '789 New St',
        latitude: 34.0522,
        longitude: -118.2437,
        is_active: true,
      };

      const response = await request(app.getServer())
        .post('/api/v1/vendor-outlets')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newVendorOutletData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newVendorOutletData.name);
    });
  });

  describe('GET /vendor-outlets', () => {
    it('should return a list of vendor outlets', async () => {
        const response = await request(app.getServer())
            .get('/api/v1/vendor-outlets')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].name).toBe(testVendorOutlet.name);
    });
    });

    describe('GET /vendor-outlets/:id', () => {
        it('should return a single vendor outlet by id', async () => {
            const response = await request(app.getServer())
                .get(`/api/v1/vendor-outlets/${testVendorOutlet.id}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.id).toBe(testVendorOutlet.id);
            expect(response.body.name).toBe(testVendorOutlet.name);
        });
    });

    describe('PUT /vendor-outlets/:id', () => {
        it('should update a vendor outlet and return 200', async () => {
            const updatedData = {
                name: 'Updated Vendor Outlet Name',
            };

            const response = await request(app.getServer())
                .put(`/api/v1/vendor-outlets/${testVendorOutlet.id}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updatedData);

            expect(response.status).toBe(200);
            expect(response.body.name).toBe(updatedData.name);
        });
    });

    describe('DELETE /vendor-outlets/:id', () => {
        it('should delete a vendor outlet and return 204', async () => {
            const response = await request(app.getServer())
                .delete(`/api/v1/vendor-outlets/${testVendorOutlet.id}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(204);
        });
    });
});
