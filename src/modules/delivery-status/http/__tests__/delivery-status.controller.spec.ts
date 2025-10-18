import request from 'supertest';
import express from 'express';
import { deliveryStatusRouter } from '../routes';

const app = express();
app.use(express.json());
app.use('/delivery-status', deliveryStatusRouter);

describe('DeliveryStatus Controller', () => {
  it('should get a list of delivery statuses and return 200', async () => {
    const response = await request(app).get('/delivery-status');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a delivery status by id and return 200', async () => {
    const response = await request(app).get('/delivery-status/mock-id');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 'mock-id');
  });
});