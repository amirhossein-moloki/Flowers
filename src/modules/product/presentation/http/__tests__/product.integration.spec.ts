import { Express } from 'express';
import supertest from 'supertest';
import App from '@/app';
import { PrismaClient, UserRole, Vendor } from '@prisma/client';

let authenticatedUser: { id: string; role: UserRole } | null = null;

jest.mock('@/core/middlewares/auth.middleware', () => ({
  __esModule: true,
  isAuthenticated: jest.fn((req: any, res: any, next: any) => {
    if (authenticatedUser) {
      req.user = authenticatedUser;
      return next();
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }),
  hasRole: jest.fn((roles: UserRole[]) => (req: any, res: any, next: any) => {
    if (authenticatedUser && roles.includes(authenticatedUser.role)) {
      return next();
    }
    return res.status(403).json({ message: 'Forbidden' });
  }),
}));

describe('Product Integration Tests', () => {
  let app: Express;
  let prisma: PrismaClient;
  let vendor: Vendor;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
    const application = new App(prisma);
    app = application.getServer();
  });

  beforeEach(async () => {
    authenticatedUser = { id: 'test-user', role: UserRole.ADMIN };
    vendor = await prisma.vendor.create({
      data: {
        name: 'Test Vendor',
        description: 'Test Vendor Description',
        email: 'vendor@test.com',
        phone: '1234567890',
        address: '123 Test St',
      },
    });
  });

  afterEach(async () => {
    authenticatedUser = null;
    await prisma.productImage.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.vendorOutlet.deleteMany({});
    await prisma.vendor.deleteMany({});
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/v1/products', () => {
    it('should create a new product and return 201', async () => {
      const newProduct = {
        name: 'Test Product',
        description: 'Test Product Description',
        price: 100,
        stock: 10,
        vendorId: vendor.id,
      };

      const response = await supertest(app)
        .post('/api/v1/products')
        .send(newProduct);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newProduct.name);
    });

    it('should return 422 for missing required fields', async () => {
      const newProduct = {
        description: 'Test Product Description',
        price: 100,
        vendorId: vendor.id,
      };

      const response = await supertest(app)
        .post('/api/v1/products')
        .send(newProduct);

      expect(response.status).toBe(422);
    });

    it('should return 401 for unauthenticated users', async () => {
      authenticatedUser = null;

      const newProduct = {
        name: 'Test Product',
        description: 'Test Product Description',
        price: 100,
        stock: 10,
        vendorId: vendor.id,
      };

      const response = await supertest(app)
        .post('/api/v1/products')
        .send(newProduct);

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/v1/products', () => {
    it('should return a list of products', async () => {
      await prisma.product.create({
        data: {
          name: 'Test Product',
          description: 'Test Product Description',
          price: 100,
          vendorId: vendor.id,
        },
      });

      const response = await supertest(app).get('/api/v1/products');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });

    it('should filter products by vendorId', async () => {
      const anotherVendor = await prisma.vendor.create({
        data: {
          name: 'Another Test Vendor',
          description: 'Another Test Vendor Description',
          email: 'vendor2@test.com',
          phone: '0987654321',
          address: '321 Test St',
        },
      });

      await prisma.product.createMany({
        data: [
          {
            name: 'Product 1',
            description: 'Description 1',
            price: 100,
            vendorId: vendor.id,
          },
          {
            name: 'Product 2',
            description: 'Description 2',
            price: 200,
            vendorId: anotherVendor.id,
          },
        ],
      });

      const response = await supertest(app)
        .get('/api/v1/products')
        .query({ vendorId: vendor.id });

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe('Product 1');
    });
  });

  describe('GET /api/v1/products/:id', () => {
    it('should return a product by id', async () => {
      const product = await prisma.product.create({
        data: {
          name: 'Test Product',
          description: 'Test Product Description',
          price: 100,
          vendorId: vendor.id,
        },
      });

      const response = await supertest(app).get(`/api/v1/products/${product.id}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(product.id);
    });

    it('should return 404 for a non-existent product', async () => {
      const response = await supertest(app).get('/api/v1/products/non-existent-id');
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/v1/products/:id', () => {
    it('should update a product and return 200', async () => {
      const product = await prisma.product.create({
        data: {
          name: 'Test Product',
          description: 'Test Product Description',
          price: 100,
          vendorId: vendor.id,
        },
      });

      const updatedProduct = {
        name: 'Updated Product',
        price: 200,
      };

      const response = await supertest(app)
        .put(`/api/v1/products/${product.id}`)
        .send(updatedProduct);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(updatedProduct.name);
      expect(response.body.price).toBe(updatedProduct.price);
    });

    it('should return 422 for invalid data', async () => {
      const product = await prisma.product.create({
        data: {
          name: 'Test Product',
          description: 'Test Product Description',
          price: 100,
          vendorId: vendor.id,
        },
      });

      const updatedProduct = {
        price: -100,
      };

      const response = await supertest(app)
        .put(`/api/v1/products/${product.id}`)
        .send(updatedProduct);

      expect(response.status).toBe(422);
    });
  });

  describe('DELETE /api/v1/products/:id', () => {
    it('should delete a product and return 204', async () => {
      const product = await prisma.product.create({
        data: {
          name: 'Test Product',
          description: 'Test Product Description',
          price: 100,
          vendorId: vendor.id,
        },
      });

      const response = await supertest(app).delete(`/api/v1/products/${product.id}`);

      expect(response.status).toBe(204);
    });
  });
});
