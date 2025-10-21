import request from 'supertest';
import App from '@/app';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { sign, verify } from 'jsonwebtoken';
import { env } from '@/config/env';

jest.mock('@/core/middlewares/auth.middleware', () => ({
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
    hasRole: jest.fn(() => (req, res, next) => next()),
}));

describe('Address Module - Integration Tests', () => {
  let addressId: string;

  const addressData = {
    street: '123 Test St',
    city: 'Testville',
    state: 'TS',
    zipCode: '12345',
    country: 'Testland',
  };
  let app: App;
  let prisma: PrismaClient;
  let server: import('http').Server;
  let token: string;

  beforeAll(async () => {
    execSync('npx prisma migrate reset --force --schema=src/infrastructure/database/prisma/schema.prisma');
    prisma = new PrismaClient();
    await prisma.$connect();
    app = new App(prisma);
    server = app.express.listen(3001);

    const user = await prisma.user.create({
        data: {
            email: 'test@test.com',
            username: 'test',
            password: 'password',
        }
    });
    token = sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: '1h' });
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  beforeEach(async () => {
    await prisma.customerAddress.deleteMany();
    await prisma.address.deleteMany();
    });

  // Test: Create Address (POST /api/v1/address)
  describe('POST /api/v1/addresses', () => {
    it('should create a new address successfully', async () => {
      const response = await request(app.getServer())
        .post('/api/v1/addresses')
        .set('Authorization', `Bearer ${token}`)
        .send(addressData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.street).toBe(addressData.street);
      addressId = response.body.id;
    });

    it('should return 400 for invalid input', async () => {
      await request(app.getServer())
        .post('/api/v1/addresses')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...addressData, street: '' }) // Invalid street
        .expect(400);
    });
  });

  // Test: Get Address by ID (GET /api/v1/address/:id)
  describe('GET /api/v1/addresses/:id', () => {
    beforeEach(async () => {
      // Create an address to be fetched
      const response = await request(app.getServer()).post('/api/v1/addresses').set('Authorization', `Bearer ${token}`).send(addressData);
      addressId = response.body.id;
    });

    it('should retrieve an address by its ID', async () => {
      const response = await request(app.getServer())
        .get(`/api/v1/addresses/${addressId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.id).toBe(addressId);
      expect(response.body.street).toBe(addressData.street);
    });

    it('should return 404 for a non-existent address', async () => {
      await request(app.getServer())
        .get('/api/v1/addresses/non-existent-id')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  // Test: List Addresses (GET /api/v1/address)
  describe('GET /api/v1/addresses', () => {
    beforeEach(async () => {
      // Create a couple of addresses to be listed
      await request(app.getServer()).post('/api/v1/addresses').set('Authorization', `Bearer ${token}`).send(addressData);
      await request(app.getServer()).post('/api/v1/addresses').set('Authorization', `Bearer ${token}`).send({ ...addressData, street: '456 Other St' });
    });

    it('should retrieve a list of addresses', async () => {
      const response = await request(app.getServer())
        .get('/api/v1/addresses')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
    });
  });

  // Test: Update Address (PUT /api/v1/address/:id)
  describe('PUT /api/v1/addresses/:id', () => {
    beforeEach(async () => {
      // Create an address to be updated
      const response = await request(app.getServer()).post('/api/v1/addresses').set('Authorization', `Bearer ${token}`).send(addressData);
      addressId = response.body.id;
    });

    it('should update an existing address', async () => {
      const updatedData = { ...addressData, street: '456 Updated St' };
      const response = await request(app.getServer())
        .put(`/api/v1/addresses/${addressId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedData)
        .expect(200);

      expect(response.body.street).toBe(updatedData.street);
    });

    it('should return 400 for invalid update data', async () => {
      await request(app.getServer())
        .put(`/api/v1/addresses/${addressId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ ...addressData, zipCode: '' }) // Invalid zipCode
        .expect(400);
    });
  });

  // Test: Delete Address (DELETE /api/v1/address/:id)
  describe('DELETE /api/v1/addresses/:id', () => {
    beforeEach(async () => {
      // Create an address to be deleted
      const response = await request(app.getServer()).post('/api/v1/addresses').set('Authorization', `Bearer ${token}`).send(addressData);
      addressId = response.body.id;
    });

    it('should delete an address successfully', async () => {
      await request(app.getServer())
        .delete(`/api/v1/addresses/${addressId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);
    });

    it('should return 404 when trying to get the deleted address', async () => {
        await request(app.getServer())
          .delete(`/api/v1/addresses/${addressId}`) // make sure it's gone
          .set('Authorization', `Bearer ${token}`);

        await request(app.getServer())
          .get(`/api/v1/addresses/${addressId}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(404);
      });
  });
});