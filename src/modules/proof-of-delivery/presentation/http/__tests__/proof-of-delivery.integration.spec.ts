import { Express } from 'express';
import { PrismaClient, UserRole } from '@prisma/client';
import request from 'supertest';
import { randomUUID } from 'crypto';
import App from '@/app';
import { isAuthenticated } from '@/core/middlewares/auth.middleware';
import { Request, Response, NextFunction } from 'express';

jest.mock('@/core/middlewares/auth.middleware', () => ({
  isAuthenticated: jest.fn((req: Request, res: Response, next: NextFunction) => next()),
  hasRole: jest.fn(() => (req: Request, res: Response, next: NextFunction) => next()),
}));

describe('ProofOfDelivery Integration Tests', () => {
  let app: Express;
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
    const appInstance = new App(prisma);
    app = appInstance.getServer();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.proofOfDelivery.deleteMany();
    await prisma.delivery.deleteMany();
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.courier.deleteMany({});
    await prisma.user.deleteMany({});

    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
        role: UserRole.CUSTOMER,
      },
    });

    const courier = await prisma.courier.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            vehicle: 'motorcycle',
        }
    });

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: 100,
        status: 'PENDING',
      },
    });

    await prisma.delivery.create({
      data: {
        order_id: order.id,
        courier_id: courier.id,
        assigned_at: new Date(),
        expected_delivery_date: new Date(),
        tracking_number: '12345',
      },
    });
  });

  describe('POST /api/v1/proof-of-delivery', () => {
    it('should create a new proof of delivery and return 201', async () => {
      const delivery = await prisma.delivery.findFirst();
      const response = await request(app)
        .post('/api/v1/proof-of-delivery')
        .send({
          delivery_id: delivery!.id,
          signature_url: 'http://example.com/signature.png',
          photo_url: 'http://example.com/photo.png',
          notes: 'Package left at the front door.',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.signature_url).toBe('http://example.com/signature.png');
    });

    it('should return 422 if delivery_id is missing', async () => {
      const response = await request(app)
        .post('/api/v1/proof-of-delivery')
        .send({
          signature_url: 'http://example.com/signature.png',
        });

      expect(response.status).toBe(422);
    });
  });

  describe('GET /api/v1/proof-of-delivery/:id', () => {
    it('should return a proof of delivery by id', async () => {
      const delivery = await prisma.delivery.findFirst();
      const proofOfDelivery = await prisma.proofOfDelivery.create({
        data: {
          delivery_id: delivery!.id,
          signature_url: 'http://example.com/signature.png',
        },
      });

      const response = await request(app).get(`/api/v1/proof-of-delivery/${proofOfDelivery.id}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(proofOfDelivery.id);
    });

    it('should return 404 if proof of delivery not found', async () => {
      const response = await request(app).get(`/api/v1/proof-of-delivery/${randomUUID()}`);
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/v1/proof-of-delivery/:id', () => {
    it('should update a proof of delivery and return 200', async () => {
      const delivery = await prisma.delivery.findFirst();
      const proofOfDelivery = await prisma.proofOfDelivery.create({
        data: {
          delivery_id: delivery!.id,
          notes: 'Initial notes',
        },
      });

      const response = await request(app)
        .put(`/api/v1/proof-of-delivery/${proofOfDelivery.id}`)
        .send({ notes: 'Updated notes' });

      expect(response.status).toBe(200);
      expect(response.body.notes).toBe('Updated notes');
    });

    it('should return 404 if proof of delivery not found', async () => {
      const response = await request(app)
        .put(`/api/v1/proof-of-delivery/${randomUUID()}`)
        .send({ notes: 'Updated notes' });
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/v1/proof-of-delivery/:id', () => {
    it('should delete a proof of delivery and return 204', async () => {
      const delivery = await prisma.delivery.findFirst();
      const proofOfDelivery = await prisma.proofOfDelivery.create({
        data: {
          delivery_id: delivery!.id,
        },
      });

      const response = await request(app).delete(`/api/v1/proof-of-delivery/${proofOfDelivery.id}`);

      expect(response.status).toBe(204);

      const deletedProofOfDelivery = await prisma.proofOfDelivery.findUnique({
        where: { id: proofOfDelivery.id },
      });
      expect(deletedProofOfDelivery).toBeNull();
    });

    it('should return 404 if proof of delivery not found', async () => {
      const response = await request(app).delete(`/api/v1/proof-of-delivery/${randomUUID()}`);
      expect(response.status).toBe(404);
    });
  });

  describe('Authentication', () => {
    beforeEach(() => {
      (isAuthenticated as jest.Mock).mockImplementation((req: Request, res: Response, next: NextFunction) => {
        return res.status(401).json({ message: 'Unauthorized' });
      });
    });

    it('should return 401 for POST /api/v1/proof-of-delivery if not authenticated', async () => {
      const response = await request(app).post('/api/v1/proof-of-delivery');
      expect(response.status).toBe(401);
    });

    it('should return 401 for GET /api/v1/proof-of-delivery/:id if not authenticated', async () => {
        const response = await request(app).get(`/api/v1/proof-of-delivery/${randomUUID()}`);
        expect(response.status).toBe(401);
    });

    it('should return 401 for PUT /api/v1/proof-of-delivery/:id if not authenticated', async () => {
        const response = await request(app).put(`/api/v1/proof-of-delivery/${randomUUID()}`);
        expect(response.status).toBe(401);
    });

    it('should return 401 for DELETE /api/v1/proof-of-delivery/:id if not authenticated', async () => {
        const response = await request(app).delete(`/api/v1/proof-of-delivery/${randomUUID()}`);
        expect(response.status).toBe(401);
    });
  });
});
