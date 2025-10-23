import request from 'supertest';
import express from 'express';
import { createDeliveryStatusRoutes } from '../routes';
import { GetDeliveryStatusUseCase } from '../../application/use-cases/get-delivery-status.usecase';
import { ListDeliveryStatusesUseCase } from '../../application/use-cases/list-delivery-statuses.usecase';
import { success } from '@/core/utils/result';

const mockGetDeliveryStatusUseCase = {
  execute: jest.fn(),
};

const mockListDeliveryStatusesUseCase = {
  execute: jest.fn(),
};

const dependencies = {
  getDeliveryStatusUseCase: mockGetDeliveryStatusUseCase,
  listDeliveryStatusesUseCase: mockListDeliveryStatusesUseCase,
};

// @ts-ignore
const deliveryStatusRouter = createDeliveryStatusRoutes(dependencies);

const app = express();
app.use(express.json());
app.use('/delivery-status', deliveryStatusRouter);

describe('DeliveryStatus Controller', () => {
  it('should get a list of delivery statuses and return 200', async () => {
    // @ts-ignore
    mockListDeliveryStatusesUseCase.execute.mockResolvedValue(success([]));
    const response = await request(app).get('/delivery-status');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a delivery status by id and return 200', async () => {
    const mockDeliveryStatus = { id: 'mock-id', status: 'PENDING' };
    // @ts-ignore
    mockGetDeliveryStatusUseCase.execute.mockResolvedValue(success(mockDeliveryStatus));
    const response = await request(app).get('/delivery-status/mock-id');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 'mock-id');
  });
});