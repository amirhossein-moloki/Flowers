import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import App from '@/app';
import { User } from '@prisma/client';
import { randomUUID } from 'crypto';

jest.mock('@/core/middlewares/auth.middleware', () => ({
  isAuthenticated: (req, res, next) => next(),
  hasRole: (roles) => (req, res, next) => next(),
}));

describe('Notification Integration Tests', () => {
  let app: App;
  let prisma: PrismaClient;
  let user: User;

  beforeAll(() => {
    prisma = new PrismaClient();
    app = new App(prisma);
  });

  beforeEach(async () => {
    // Correct cleanup order
    await prisma.notification.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.order.deleteMany();
    await prisma.user.deleteMany();

    user = await prisma.user.create({
      data: {
        id: randomUUID(),
        email: 'test-user@example.com',
        username: 'test-user',
        password: 'password123',
        role: 'CUSTOMER',
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /notifications', () => {
    it('should create a new notification and return 201', async () => {
      const newNotification = {
        title: 'Test Notification',
        message: 'This is a test notification.',
        recipient: user.id,
      };

      const response = await request(app.getServer())
        .post('/api/v1/notifications')
        .send(newNotification);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newNotification.title);
    });

    it('should return 422 for missing required fields', async () => {
      const newNotification = {
        title: 'Test Notification',
      };

      const response = await request(app.getServer())
        .post('/api/v1/notifications')
        .send(newNotification);

      expect(response.status).toBe(422);
    });
  });

  describe('GET /notifications/:id', () => {
    it('should return a notification by id', async () => {
      const notification = await prisma.notification.create({
        data: {
          title: 'Get Test',
          message: 'Get test message',
          recipient: user.id,
        },
      });

      const response = await request(app.getServer()).get(
        `/api/v1/notifications/${notification.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(notification.id);
    });

    it('should return 404 for a non-existent notification', async () => {
      const response = await request(app.getServer()).get(
        `/api/v1/notifications/${randomUUID()}`,
      );
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /notifications/:id', () => {
    it('should update a notification and return 200', async () => {
      const notification = await prisma.notification.create({
        data: {
          title: 'Update Test',
          message: 'Update test message',
          recipient: user.id,
        },
      });

      const updatedData = {
        title: 'Updated Title',
      };

      const response = await request(app.getServer())
        .put(`/api/v1/notifications/${notification.id}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updatedData.title);
    });

    it('should return 404 for updating a non-existent notification', async () => {
      const response = await request(app.getServer())
        .put(`/api/v1/notifications/${randomUUID()}`)
        .send({ title: 'New Title' });
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /notifications/:id', () => {
    it('should delete a notification and return 204', async () => {
      const notification = await prisma.notification.create({
        data: {
          title: 'Delete Test',
          message: 'Delete test message',
          recipient: user.id,
        },
      });

      const response = await request(app.getServer()).delete(
        `/api/v1/notifications/${notification.id}`,
      );

      expect(response.status).toBe(204);

      const findDeleted = await prisma.notification.findUnique({
        where: { id: notification.id },
      });
      expect(findDeleted).toBeNull();
    });

    it('should return 404 for deleting a non-existent notification', async () => {
      const response = await request(app.getServer()).delete(
        `/api/v1/notifications/${randomUUID()}`,
      );
      expect(response.status).toBe(404);
    });
  });
});