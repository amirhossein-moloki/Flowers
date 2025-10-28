import request from 'supertest';
import App from '@/app';
import { PrismaClient, Order, User, AutomationLog, Vendor, Product, Address, CustomerAddress, ServiceZone, VendorOutlet, OrderItem } from '@prisma/client';
import { faker } from '@faker-js/faker';

// Mock the faker module to ensure consistent test data
jest.mock('@faker-js/faker', () => ({
  faker: {
    internet: {
      email: jest.fn()
        .mockReturnValueOnce('user.test@example.com')
        .mockReturnValue('vendor.test@example.com'),
      password: () => 'password123',
      userName: () => 'testuser',
    },
    phone: {
      number: () => '123-456-7890',
    },
    company: {
      name: () => 'Test Vendor',
    },
    commerce: {
      productName: () => 'Test Product',
    },
    location: {
      streetAddress: () => '123 Test St',
      city: () => 'Testville',
      state: () => 'Testland',
      zipCode: () => '12345',
      latitude: () => 10.0,
      longitude: () => 10.0,
    },
    number: {
      int: ({ min, max }) => (min || 1),
    },
  },
}));

describe('AutomationLog Integration Tests', () => {
  let app: App;
  let prisma: PrismaClient;
  let user: User;
  let vendor: Vendor;
  let product: Product;
  let address: Address;
  let customerAddress: CustomerAddress;
  let serviceZone: ServiceZone;
  let vendorOutlet: VendorOutlet;
  let order: Order;
  let automationLog: AutomationLog;

  beforeAll(() => {
    prisma = new PrismaClient();
    app = new App(prisma);
  });

  beforeEach(async () => {
    // Create entities in an order that respects dependencies
    const uniqueId = new Date().getTime();
    user = await prisma.user.create({
      data: {
        email: `user.${uniqueId}@example.com`,
        username: `user${uniqueId}`,
        password: 'password',
        role: 'CUSTOMER',
      },
    });

    vendor = await prisma.vendor.create({
      data: {
        name: `Vendor ${uniqueId}`,
        email: `vendor.${uniqueId}@example.com`,
        phone: `1234567890${uniqueId}`,
        address: '123 Test St',
      },
    });

    product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        price: 10,
        vendorId: vendor.id,
      },
    });

    address = await prisma.address.create({
      data: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: 'Testland'
      }
    });

    serviceZone = await prisma.serviceZone.create({
      data: {
        name: faker.location.city(),
        geo_json: '{"type":"Polygon","coordinates":[]}'
      }
    });

    vendorOutlet = await prisma.vendorOutlet.create({
      data: {
        vendor_id: vendor.id,
        name: 'Test Outlet',
        address: faker.location.streetAddress(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude()
      }
    });

    customerAddress = await prisma.customerAddress.create({
      data: {
        address_id: address.id,
        user_id: user.id,
        label: 'home',
      }
    });

    order = await prisma.order.create({
      data: {
        userId: user.id,
        total: product.price
      },
    });

    await prisma.orderItem.create({
        data: {
            orderId: order.id,
            productId: product.id,
            quantity: 1,
            price: product.price
        }
    });

    automationLog = await prisma.automationLog.create({
      data: {
        order_id: order.id,
        action: 'test_action',
        status: 'test_status',
        message: 'test_message',
        executed_at: new Date(),
      },
    });
  });

  afterEach(async () => {
    // Delete in reverse order of creation to respect foreign key constraints
    await prisma.automationLog.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.customerAddress.deleteMany();
    await prisma.address.deleteMany();
    await prisma.product.deleteMany();
    await prisma.vendorOutlet.deleteMany();
    await prisma.serviceZone.deleteMany();
    await prisma.vendor.deleteMany();
    await prisma.user.deleteMany();
  });

  it('should return a list of automation logs', async () => {
    const response = await request(app.getServer())
      .get('/api/v1/automation-logs')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(1);
    expect(response.body[0].id).toBe(automationLog.id);
  });
});
