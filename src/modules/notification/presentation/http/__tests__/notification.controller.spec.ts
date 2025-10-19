import 'reflect-metadata';
import request from 'supertest';
import express from 'express';
import { createNotificationRoutes } from '../notification.routes';
import { CreateNotificationUseCase } from '../../../application/use-cases/create-notification.usecase';
import { GetNotificationUseCase } from '../../../application/use-cases/get-notification.usecase';
import { UpdateNotificationUseCase } from '../../../application/use-cases/update-notification.usecase';
import { DeleteNotificationUseCase } from '../../../application/use-cases/delete-notification.usecase';
import { Dependencies } from '../../../../../infrastructure/di';
import { mock, MockProxy } from 'jest-mock-extended';

describe('NotificationController', () => {
  let app: express.Express;
  let dependencies: MockProxy<Dependencies>;
  let createNotificationUseCase: jest.Mocked<CreateNotificationUseCase>;
  let getNotificationUseCase: jest.Mocked<GetNotificationUseCase>;
  let updateNotificationUseCase: jest.Mocked<UpdateNotificationUseCase>;
  let deleteNotificationUseCase: jest.Mocked<DeleteNotificationUseCase>;

  beforeEach(() => {
    dependencies = mock<Dependencies>();
    createNotificationUseCase = { execute: jest.fn() } as unknown as jest.Mocked<CreateNotificationUseCase>;
    getNotificationUseCase = { execute: jest.fn() } as unknown as jest.Mocked<GetNotificationUseCase>;
    updateNotificationUseCase = { execute: jest.fn() } as unknown as jest.Mocked<UpdateNotificationUseCase>;
    deleteNotificationUseCase = { execute: jest.fn() } as unknown as jest.Mocked<DeleteNotificationUseCase>;

    dependencies.createNotificationUseCase = createNotificationUseCase;
    dependencies.getNotificationUseCase = getNotificationUseCase;
    dependencies.updateNotificationUseCase = updateNotificationUseCase;
    dependencies.deleteNotificationUseCase = deleteNotificationUseCase;

    app = express();
    app.use(express.json());
    app.use('/notifications', createNotificationRoutes(dependencies));
  });

  describe('POST /notifications/trigger', () => {
    it('should return 201 and the created notification', async () => {
      const notification = {
        id: '1',
        title: 'Test',
        message: 'Test message',
        recipient: 'test@example.com',
        createdAt: new Date(),
      };
      createNotificationUseCase.execute.mockResolvedValue({ success: true, value: notification as any });

      const response = await request(app)
        .post('/notifications/trigger')
        .send({ title: 'Test', message: 'Test message', recipient: 'test@example.com' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: '1',
        title: 'Test',
        message: 'Test message',
        recipient: 'test@example.com',
        createdAt: notification.createdAt.toISOString(),
      });
    });
  });

  describe('POST /notifications', () => {
    it('should return 201 and the created notification', async () => {
      const notification = {
        id: '1',
        title: 'Test',
        message: 'Test message',
        recipient: 'test@example.com',
        createdAt: new Date(),
      };
      createNotificationUseCase.execute.mockResolvedValue({ success: true, value: notification as any });

      const response = await request(app)
        .post('/notifications')
        .send({ title: 'Test', message: 'Test message', recipient: 'test@example.com' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: '1',
        title: 'Test',
        message: 'Test message',
        recipient: 'test@example.com',
        createdAt: notification.createdAt.toISOString(),
      });
    });
  });

  describe('GET /notifications/:id', () => {
    it('should return 200 and the notification', async () => {
      const notification = {
        id: '1',
        title: 'Test',
        message: 'Test message',
        recipient: 'test@example.com',
        createdAt: new Date(),
      };
      getNotificationUseCase.execute.mockResolvedValue({ success: true, value: notification as any });

      const response = await request(app).get('/notifications/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: '1',
        title: 'Test',
        message: 'Test message',
        recipient: 'test@example.com',
        createdAt: notification.createdAt.toISOString(),
      });
    });
  });

  describe('PUT /notifications/:id', () => {
    it('should return 200 and the updated notification', async () => {
      const notification = {
        id: '1',
        title: 'Updated Test',
        message: 'Updated test message',
        recipient: 'test@example.com',
        createdAt: new Date(),
      };
      updateNotificationUseCase.execute.mockResolvedValue({ success: true, value: notification as any });

      const response = await request(app)
        .put('/notifications/1')
        .send({ title: 'Updated Test', message: 'Updated test message' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: '1',
        title: 'Updated Test',
        message: 'Updated test message',
        recipient: 'test@example.com',
        createdAt: notification.createdAt.toISOString(),
      });
    });
  });

  describe('DELETE /notifications/:id', () => {
    it('should return 204', async () => {
      deleteNotificationUseCase.execute.mockResolvedValue({ success: true, value: undefined });

      const response = await request(app).delete('/notifications/1');

      expect(response.status).toBe(204);
    });
  });
});
