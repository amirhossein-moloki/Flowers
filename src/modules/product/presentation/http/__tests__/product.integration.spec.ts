import { Express } from 'express';
import supertest from 'supertest';
import App from '@/app';
import { PrismaClient, UserRole } from '@prisma/client';

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

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
    const application = new App(prisma);
    app = application.getServer();
  });

  beforeEach(async () => {
    authenticatedUser = { id: 'test-user', role: UserRole.ADMIN };
    await prisma.orderItem.deleteMany({});
    await prisma.productImage.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.vendorOutlet.deleteMany({});
    await prisma.vendor.deleteMany({});
  });

  afterEach(async () => {
    authenticatedUser = null;
    await prisma.orderItem.deleteMany({});
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
      const vendor = await prisma.vendor.create({
        data: {
          name: 'Test Vendor',
          description: 'Test Vendor Description',
          email: 'vendor@test.com',
          phone: '1234567890',
          address: '123 Test St',
        },
      });
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
  });
});
