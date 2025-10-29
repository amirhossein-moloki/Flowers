import request from 'supertest';
import express from 'express';
import { createCourierRoutes } from '../routes';
import { success } from '@/core/utils/result';
import { CourierDto } from '../../application/dtos/courier.dto';

import { Request, Response, NextFunction } from 'express';

jest.mock('@/core/middlewares/auth.middleware', () => ({
  isAuthenticated: (req: Request, res: Response, next: NextFunction) => next(),
  hasRole: (roles: string[]) => (req: Request, res: Response, next: NextFunction) => next(),
}));

const app = express();
app.use(express.json());

const mockCreateCourierUseCase = {
  execute: jest.fn(),
};
const mockGetCourierUseCase = {
  execute: jest.fn(),
};
const mockUpdateCourierUseCase = {
  execute: jest.fn(),
};
const mockDeleteCourierUseCase = {
  execute: jest.fn(),
};
const mockListCouriersUseCase = {
  execute: jest.fn(),
};

const courierRouter = createCourierRoutes(
  mockCreateCourierUseCase as any,
  mockGetCourierUseCase as any,
  mockUpdateCourierUseCase as any,
  mockDeleteCourierUseCase as any,
  mockListCouriersUseCase as any,
);

app.use('/courier', courierRouter);

describe('Courier Controller', () => {
  const courierDto: CourierDto = {
    id: 'mock-id',
    name: 'Test Courier',
    phone: '123-456-7890',
    email: 'test.courier@example.com',
    vehicle: 'motorcycle',
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should create a new courier and return 201', async () => {
    mockCreateCourierUseCase.execute.mockResolvedValue(success(courierDto));
    const response = await request(app)
      .post('/courier')
      .send({
        name: 'Test Courier',
        phone: '123-456-7890',
        email: 'test.courier@example.com',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should return 422 for invalid create data', async () => {
    const response = await request(app)
      .post('/courier')
      .send({
        name: 'Test Courier',
      });
    expect(response.status).toBe(422);
  });

  it('should get a list of couriers and return 200', async () => {
    mockListCouriersUseCase.execute.mockResolvedValue(success([courierDto]));
    const response = await request(app).get('/courier');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a courier by id and return 200', async () => {
    mockGetCourierUseCase.execute.mockResolvedValue(success(courierDto));
    const response = await request(app).get('/courier/mock-id');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 'mock-id');
  });

  it('should update a courier and return 200', async () => {
    mockUpdateCourierUseCase.execute.mockResolvedValue(success(courierDto));
    const response = await request(app)
      .put('/courier/mock-id')
      .send({
        name: 'Updated Courier',
      });
    expect(response.status).toBe(200);
  });

  it('should delete a courier and return 204', async () => {
    mockDeleteCourierUseCase.execute.mockResolvedValue(success(undefined));
    const response = await request(app).delete('/courier/mock-id');
    expect(response.status).toBe(204);
  });
});