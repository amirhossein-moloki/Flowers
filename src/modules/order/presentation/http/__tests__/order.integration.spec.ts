import request from 'supertest';
import App from '@/app';
import prismaClient from '@/infrastructure/database/prisma/prisma-client';
import { User, UserRole, OrderStatus } from '@prisma/client';

jest.mock('@prisma/client', () => {
  const originalModule = jest.requireActual('@prisma/client');
  return {
    ...originalModule,
    DiscountType: {
      PERCENTAGE: 'PERCENTAGE',
      FIXED_AMOUNT: 'FIXED_AMOUNT',
    },
  };
});

let mockUser: User | null = null;

jest.mock('@/core/middlewares/auth.middleware', () => ({
  isAuthenticated: jest.fn((req, res, next) => {
    if (mockUser) {
      req.user = mockUser;
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }),
  hasRole: jest.fn(() => (req, res, next) => next()),
}));

describe('Order Integration Tests', () => {
  let app: App;

  beforeEach(async () => {
    app = new App(prismaClient);
    await prismaClient.orderItem.deleteMany({});
    await prismaClient.payment.deleteMany({});
    await prismaClient.order.deleteMany({});
    await prismaClient.user.deleteMany({});
    mockUser = await prismaClient.user.create({
      data: {
        email: 'testuser@example.com',
        password: 'password',
        username: 'testuser',
        role: UserRole.CUSTOMER,
      },
    });
  });

  afterEach(async () => {
    await prismaClient.orderItem.deleteMany({});
    await prismaClient.order.deleteMany({});
    await prismaClient.product.deleteMany({});
    await prismaClient.vendorOutlet.deleteMany({});
    await prismaClient.vendor.deleteMany({});
    await prismaClient.user.deleteMany({});
    mockUser = null;
  });

  describe('POST /orders', () => {
    it('should create a new order and return 201', async () => {
      const vendor = await prismaClient.vendor.create({
        data: {
          name: 'Test Vendor',
          email: 'vendor2@example.com',
          phone: '1234567891',
          address: '123 Test St',
        },
      });

      const product = await prismaClient.product.create({
        data: {
          name: 'Test Product',
          price: 100,
          vendorId: vendor.id,
        },
      });

      const orderData = {
        userId: mockUser?.id,
        items: [{ productId: product.id, quantity: 1, price: 100 }],
      };

      const response = await request(app.getServer())
        .post('/api/v1/orders')
        .send(orderData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.total).toBe(100);
    });

    it('should return 422 for invalid data', async () => {
      const orderData = {
        userId: mockUser?.id,
        items: [],
      };

      const response = await request(app.getServer())
        .post('/api/v1/orders')
        .send(orderData);

      expect(response.status).toBe(422);
    });
  });

  describe('GET /orders/:id', () => {
    it('should return an order by id', async () => {
      const vendor = await prismaClient.vendor.create({
        data: {
          name: 'Test Vendor',
          email: 'vendor@example.com',
          phone: '1234567890',
          address: '123 Test St',
        },
      });

      const product = await prismaClient.product.create({
        data: {
          name: 'Test Product',
          price: 100,
          vendorId: vendor.id,
        },
      });

      const order = await prismaClient.order.create({
        data: {
          userId: mockUser?.id,
          total: 100,
          status: OrderStatus.PENDING,
          items: {
            create: {
              productId: product.id,
              quantity: 1,
              price: 100,
            },
          },
        },
      });

      const response = await request(app.getServer()).get(
        `/api/v1/orders/${order.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', order.id);
    });

    it('should return 404 for a non-existent order', async () => {
      const response = await request(app.getServer()).get(
        '/api/v1/orders/non-existent-id',
      );
      expect(response.status).toBe(404);
    });
  });

  describe('GET /orders', () => {
    it('should return a list of orders', async () => {
      const vendor = await prismaClient.vendor.create({
        data: {
          name: 'Test Vendor',
          email: 'vendor3@example.com',
          phone: '1234567892',
          address: '123 Test St',
        },
      });

      const product = await prismaClient.product.create({
        data: {
          name: 'Test Product',
          price: 100,
          vendorId: vendor.id,
        },
      });

      await prismaClient.order.create({
        data: {
          userId: mockUser?.id,
          total: 100,
          status: OrderStatus.PENDING,
          items: {
            create: {
              productId: product.id,
              quantity: 1,
              price: 100,
            },
          },
        },
      });

      const response = await request(app.getServer()).get('/api/v1/orders');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('PUT /orders/:id', () => {
    it('should update an order', async () => {
      const vendor = await prismaClient.vendor.create({
        data: {
          name: 'Test Vendor',
          email: 'vendor4@example.com',
          phone: '1234567893',
          address: '123 Test St',
        },
      });

      const product = await prismaClient.product.create({
        data: {
          name: 'Test Product',
          price: 100,
          vendorId: vendor.id,
        },
      });

      const order = await prismaClient.order.create({
        data: {
          userId: mockUser?.id,
          total: 100,
          status: OrderStatus.PENDING,
          items: {
            create: {
              productId: product.id,
              quantity: 1,
              price: 100,
            },
          },
        },
      });

      const updatedData = {
        total: 200,
      };

      const response = await request(app.getServer())
        .put(`/api/v1/orders/${order.id}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.total).toBe(200);
    });
  });

  describe('DELETE /orders/:id', () => {
    it('should delete an order', async () => {
      const vendor = await prismaClient.vendor.create({
        data: {
          name: 'Test Vendor',
          email: 'vendor5@example.com',
          phone: '1234567894',
          address: '123 Test St',
        },
      });

      const product = await prismaClient.product.create({
        data: {
          name: 'Test Product',
          price: 100,
          vendorId: vendor.id,
        },
      });

      const order = await prismaClient.order.create({
        data: {
          userId: mockUser?.id,
          total: 100,
          status: OrderStatus.PENDING,
          items: {
            create: {
              productId: product.id,
              quantity: 1,
              price: 100,
            },
          },
        },
      });

      const response = await request(app.getServer()).delete(
        `/api/v1/orders/${order.id}`,
      );
      expect(response.status).toBe(204);
    });
  });

  describe('POST /orders/:id/confirm', () => {
    it('should confirm an order', async () => {
      const vendor = await prismaClient.vendor.create({
        data: {
          name: 'Test Vendor',
          email: 'vendor6@example.com',
          phone: '1234567895',
          address: '123 Test St',
        },
      });

      const product = await prismaClient.product.create({
        data: {
          name: 'Test Product',
          price: 100,
          vendorId: vendor.id,
        },
      });

      const order = await prismaClient.order.create({
        data: {
          userId: mockUser?.id,
          total: 100,
          status: OrderStatus.PENDING,
          items: {
            create: {
              productId: product.id,
              quantity: 1,
              price: 100,
            },
          },
        },
      });

      const response = await request(app.getServer()).post(
        `/api/v1/orders/${order.id}/confirm`,
      );
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('PAID');
    });
  });

  describe('POST /orders/:id/cancel', () => {
    it('should cancel an order', async () => {
      const vendor = await prismaClient.vendor.create({
        data: {
          name: 'Test Vendor',
          email: 'vendor7@example.com',
          phone: '1234567896',
          address: '123 Test St',
        },
      });

      const product = await prismaClient.product.create({
        data: {
          name: 'Test Product',
          price: 100,
          vendorId: vendor.id,
        },
      });

      const order = await prismaClient.order.create({
        data: {
          userId: mockUser?.id,
          total: 100,
          status: OrderStatus.PENDING,
          items: {
            create: {
              productId: product.id,
              quantity: 1,
              price: 100,
            },
          },
        },
      });

      const response = await request(app.getServer()).post(
        `/api/v1/orders/${order.id}/cancel`,
      );
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('CANCELED');
    });
  });
});
