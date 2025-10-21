import request from 'supertest';
import App from '@/app';
import { PrismaClient, UserRole } from '@prisma/client';
import { Dependencies } from '@/infrastructure/di';
import { IUserRepository } from '@/modules/user/domain/user.repository.interface';
import { User } from '@/modules/user/domain/user.entity';
import { sign, verify } from 'jsonwebtoken';
import { env } from '@/config/env';
import { execSync } from 'child_process';
import { Address } from '@/modules/address/domain/address.entity';
import { CustomerAddress } from '@/modules/customer-address/domain/customer-address.entity';

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

describe('CustomerAddress Integration Tests', () => {
  let app: App;
  let prisma: PrismaClient;
  let dependencies: Dependencies;
  let userRepository: IUserRepository;
  let customerToken: string;
  let customerUser: User;
  let testAddress: Address;
  let testCustomerAddress: CustomerAddress;
  let server: import('http').Server;

  beforeAll(async () => {
    execSync('npx prisma migrate reset --force --schema=src/infrastructure/database/prisma/schema.prisma');
    prisma = new PrismaClient();
    await prisma.$connect();
    app = new App(prisma);
    server = app.start(env.PORT);
    dependencies = app.dependencies;

    userRepository = dependencies.userRepository;

    const customerResult = User.create({
      username: 'customer_address_test',
      email: 'customer_address_test@test.com',
      password: 'password123',
      role: UserRole.CUSTOMER,
      is_active: true,
    });

    if (customerResult.failure) {
      throw customerResult.error;
    }

    customerUser = customerResult.value;
    await userRepository.save(customerUser);

    customerToken = sign({ id: customerUser.id, role: customerUser.role }, env.JWT_SECRET, { expiresIn: '1h' });

    const addressResult = Address.create({
      street: '123 Test St',
      city: 'Test City',
      state: 'TS',
      zipCode: '12345',
      country: 'Testland',
    });

    if (addressResult.failure) {
      throw addressResult.error;
    }
    testAddress = addressResult.value;
    await dependencies.addressRepository.save(testAddress);

    const customerAddressResult = CustomerAddress.create({
        user_id: customerUser.id,
        address_id: testAddress.id,
        label: 'Home',
        is_default: true,
    });

    if (customerAddressResult.failure) {
        throw customerAddressResult.error;
    }

    testCustomerAddress = customerAddressResult.value;
    await dependencies.customerAddressRepository.save(testCustomerAddress);
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  describe('POST /customer-addresses', () => {
    it('should create a new customer address and return 201', async () => {
        const newAddress = {
            street: '456 New St',
            city: 'New City',
            state: 'NS',
            zipCode: '54321',
            country: 'Newland',
        };

        const addressResponse = await request(app.getServer())
            .post('/api/v1/addresses')
            .set('Authorization', `Bearer ${customerToken}`)
            .send(newAddress);

        expect(addressResponse.status).toBe(201);
        const addressId = addressResponse.body.id;

        const newCustomerAddressData = {
            address_id: addressId,
            label: 'Work',
            is_default: false,
        };

        const response = await request(app.getServer())
            .post('/api/v1/customer-addresses')
            .set('Authorization', `Bearer ${customerToken}`)
            .send(newCustomerAddressData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.label).toBe(newCustomerAddressData.label);
    });

    it('should return 401 for unauthenticated user', async () => {
      const response = await request(app.getServer())
        .post('/api/v1/customer-addresses')
        .send({
            address_id: 'some-address-id',
            label: 'Unauthorized Address',
        });
      expect(response.status).toBe(401);
    });

    it('should return 422 for invalid data', async () => {
        const response = await request(app.getServer())
          .post('/api/v1/customer-addresses')
          .set('Authorization', `Bearer ${customerToken}`)
          .send({ label: '' });

        expect(response.status).toBe(422);
      });
  });

  describe('GET /customer-addresses', () => {
    it('should return a list of customer addresses for the authenticated user', async () => {
      const response = await request(app.getServer())
        .get('/api/v1/customer-addresses')
        .set('Authorization', `Bearer ${customerToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].label).toBe(testCustomerAddress.label);
    });
  });

  describe('GET /customer-addresses/:id', () => {
    it('should return a single customer address by id', async () => {
      const response = await request(app.getServer())
        .get(`/api/v1/customer-addresses/${testCustomerAddress.id}`)
        .set('Authorization', `Bearer ${customerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(testCustomerAddress.id);
      expect(response.body.label).toBe(testCustomerAddress.label);
    });

    it('should return 404 if customer address not found', async () => {
      const nonExistentId = 'clxsmf25p000008l3g1h3c9d8';
      const response = await request(app.getServer())
        .get(`/api/v1/customer-addresses/${nonExistentId}`)
        .set('Authorization', `Bearer ${customerToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /customer-addresses/:id', () => {
    it('should update a customer address and return 200', async () => {
      const updatedData = {
        label: 'Updated Home Label',
      };

      const response = await request(app.getServer())
        .put(`/api/v1/customer-addresses/${testCustomerAddress.id}`)
        .set('Authorization', `Bearer ${customerToken}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.label).toBe(updatedData.label);
    });

    it('should return 404 for non-existent customer address', async () => {
        const nonExistentId = 'clxsmf25p000008l3g1h3c9d8';
        const response = await request(app.getServer())
            .put(`/api/v1/customer-addresses/${nonExistentId}`)
            .set('Authorization', `Bearer ${customerToken}`)
            .send({ label: "doesn't exist" });

        expect(response.status).toBe(404);
    });
  });

  describe('DELETE /customer-addresses/:id', () => {
    it('should delete a customer address and return 204', async () => {
      const response = await request(app.getServer())
        .delete(`/api/v1/customer-addresses/${testCustomerAddress.id}`)
        .set('Authorization', `Bearer ${customerToken}`);

      expect(response.status).toBe(204);
    });

    it('should return 404 when trying to delete a non-existent customer address', async () => {
        const nonExistentId = 'clxsmf25p000008l3g1h3c9d8';
        const response = await request(app.getServer())
            .delete(`/api/v1/customer-addresses/${nonExistentId}`)
            .set('Authorization', `Bearer ${customerToken}`);

        expect(response.status).toBe(404);
    });
  });
});
