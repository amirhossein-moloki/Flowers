import request from 'supertest';
import express from 'express';
import { createDeliveryRoutes } from '../routes';
import { VehicleType } from '@prisma/client';
import { Dependencies } from '@/infrastructure/di';

import { success } from '@/core/utils/result';

const mockDependencies = {
  createDeliveryUseCase: { execute: jest.fn().mockResolvedValue(success({ id: 'mock-id' })) },
  getDeliveryUseCase: { execute: jest.fn().mockResolvedValue(success({ id: 'mock-id' })) },
  updateDeliveryUseCase: { execute: jest.fn().mockResolvedValue(success({ id: 'mock-id', distance_meters: 1500 })) },
  deleteDeliveryUseCase: { execute: jest.fn().mockResolvedValue(success(undefined)) },
  listDeliveriesUseCase: { execute: jest.fn().mockResolvedValue(success([])) },
} as unknown as Dependencies;

const app = express();
app.use(express.json());
app.use('/deliveries', createDeliveryRoutes(mockDependencies));

describe('Delivery Controller', () => {
  it('should create a new delivery and return 201', async () => {
    const response = await request(app)
      .post('/deliveries')
      .send({
        order_id: 'order-1',
        courier_id: 'courier-1',
        status_id: 'status-1',
        vehicle_type: VehicleType.MOTORCYCLE,
        assigned_at: new Date(),
        pickup_at: new Date(),
        dropoff_at: new Date(),
        distance_meters: 1000,
        eta_seconds: 600,
        failure_reason: '',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should return 422 for invalid create data', async () => {
    const response = await request(app)
      .post('/deliveries')
      .send({
        order_id: 'order-1',
      });
    expect(response.status).toBe(422);
  });

  it('should get a list of deliveries and return 200', async () => {
    const response = await request(app).get('/deliveries');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a delivery by id and return 200', async () => {
    const response = await request(app).get('/deliveries/mock-id');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 'mock-id');
  });

  it('should update a delivery and return 200', async () => {
    const response = await request(app)
      .put('/deliveries/mock-id')
      .send({
        distance_meters: 1500,
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('distance_meters', 1500);
  });

  it('should delete a delivery and return 204', async () => {
    const response = await request(app).delete('/deliveries/mock-id');
    expect(response.status).toBe(204);
  });

  it('should assign a driver and return 200', async () => {
    const response = await request(app).post('/deliveries/mock-id/assign-driver');
    expect(response.status).toBe(200);
  });
});