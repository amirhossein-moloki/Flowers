import request from 'supertest';
import express from 'express';
import { courierRouter } from '../routes';

const app = express();
app.use(express.json());
app.use('/courier', courierRouter);

describe('Courier Controller', () => {
  it('should create a new courier and return 201', async () => {
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

  it('should return 400 for invalid create data', async () => {
    const response = await request(app)
      .post('/courier')
      .send({
        name: 'Test Courier',
      });
    expect(response.status).toBe(400);
  });

  it('should get a list of couriers and return 200', async () => {
    const response = await request(app).get('/courier');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a courier by id and return 200', async () => {
    const response = await request(app).get('/courier/mock-id');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 'mock-id');
  });

  it('should update a courier and return 200', async () => {
    const response = await request(app)
      .put('/courier/mock-id')
      .send({
        name: 'Updated Courier',
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated Courier');
  });

  it('should delete a courier and return 204', async () => {
    const response = await request(app).delete('/courier/mock-id');
    expect(response.status).toBe(204);
  });
});