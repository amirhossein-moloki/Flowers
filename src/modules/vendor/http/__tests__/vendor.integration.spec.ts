import request from 'supertest';
import App from '@/app';
import { PrismaClient } from '@prisma/client';
import { User, UserRole } from '@/modules/user/domain/user.entity';
import { Dependencies } from '@/infrastructure/di';
import { IUserRepository } from '@/modules/user/domain/user.repository.interface';
import { sign, verify } from 'jsonwebtoken';
import { env } from '@/config/env';
import { Vendor } from '@/modules/vendor/domain/vendor.entity';
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

describe('Vendor Integration Tests', () => {
  let app: App;
  let prisma: PrismaClient;
  let dependencies: Dependencies;
  let userRepository: IUserRepository;
  let adminToken: string;
  let customerToken: string;
  let adminUser: User;
  let testVendor: Vendor;
  let server: import('http').Server;

  beforeAll(async () => {
    execSync('npx prisma migrate reset --force --schema=src/infrastructure/database/prisma/schema.prisma');
    prisma = new PrismaClient();
    await prisma.$connect();
    app = new App(prisma);
    server = app.start(env.PORT);
    dependencies = app.dependencies;

    userRepository = dependencies.userRepository;

    const adminResult = User.create({
        username: 'admin_vendor_test',
        email: 'admin_vendor_test@test.com',
        password: 'password123',
        role: UserRole.ADMIN,
        is_active: true,
      });

      if (!adminResult.success) {
        throw adminResult.error;
      }

      adminUser = adminResult.value;
      await userRepository.save(adminUser);

      adminToken = sign({ id: adminUser.id, role: adminUser.role }, env.JWT_SECRET, { expiresIn: '1h' });

      const vendorDto = {
        name: 'Test Vendor',
        description: 'Test Description',
        email: `vendor${Math.floor(Math.random() * 10000)}@test.com`,
        phone: `+1555555${Math.floor(Math.random() * 10000)}`,
        address: '123 Test St',
      };
      const vendorResult = await dependencies.createVendorUseCase.execute(vendorDto);
      if (!vendorResult.success) {
        throw vendorResult.error;
      }
      const vendor = await dependencies.vendorRepository.findById(vendorResult.value.id);
      if (!vendor) {
        throw new Error('Vendor not found');
      }
      testVendor = vendor;
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  describe('POST /vendors', () => {
    it('should create a new vendor and return 201', async () => {
      const newVendorData = {
        name: 'New Vendor',
        description: 'A shiny new vendor.',
        email: 'new.vendor@test.com',
        phone: '+15555555555',
        address: '456 New St',
      };

      const response = await request(app.getServer())
        .post('/api/v1/vendors')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newVendorData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newVendorData.name);
    });

    it('should return 401 for unauthenticated user', async () => {
      const response = await request(app.getServer())
        .post('/api/v1/vendors')
        .send({
          name: 'Unauthorized Vendor',
          email: 'unauthorized@test.com',
          phone: '+15555555557',
          address: '789 Unauthorized St',
        });
      expect(response.status).toBe(401);
    });

    it('should return 422 for invalid data', async () => {
        const response = await request(app.getServer())
          .post('/api/v1/vendors')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ name: '' });

        expect(response.status).toBe(422);
      });
  });

  describe('GET /vendors', () => {
    it('should return a list of vendors', async () => {
      const response = await request(app.getServer())
        .get('/api/v1/vendors')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].name).toBe(testVendor.name);
    });
  });

  describe('GET /vendors/:id', () => {
    it('should return a single vendor by id', async () => {
      const response = await request(app.getServer())
        .get(`/api/v1/vendors/${testVendor.id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(testVendor.id);
      expect(response.body.name).toBe(testVendor.name);
    });

    it('should return 404 if vendor not found', async () => {
      const nonExistentId = 'clxsmf25p000008l3g1h3c9d8';
      const response = await request(app.getServer())
        .get(`/api/v1/vendors/${nonExistentId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /vendors/:id', () => {
    it('should update a vendor and return 200', async () => {
      const updatedData = {
        name: 'Updated Vendor Name',
      };

      const response = await request(app.getServer())
        .put(`/api/v1/vendors/${testVendor.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updatedData);

      const updatedVendor = await dependencies.vendorRepository.findById(testVendor.id);

      expect(response.status).toBe(200);
      expect(updatedVendor?.name).toBe(updatedData.name);
    });

    it('should return 404 for non-existent vendor', async () => {
        const nonExistentId = 'clxsmf25p000008l3g1h3c9d8';
        const response = await request(app.getServer())
            .put(`/api/v1/vendors/${nonExistentId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ name: "doesn't exist" });

        expect(response.status).toBe(404);
    });
  });

  describe('DELETE /vendors/:id', () => {
    it('should delete a vendor and return 204', async () => {
      const response = await request(app.getServer())
        .delete(`/api/v1/vendors/${testVendor.id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(204);
    });

    it('should return 404 when trying to delete a non-existent vendor', async () => {
        const nonExistentId = 'clxsmf25p000008l3g1h3c9d8';
        const response = await request(app.getServer())
            .delete(`/api/v1/vendors/${nonExistentId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(404);
    });
  });
});
