import request from 'supertest';
import express from 'express';
import { addressRouter } from '../routes';

const app = express();
app.use(express.json());
app.use('/address', addressRouter);

describe('Address Controller', () => {
  it('should create a new address and return 201', async () => {
    const response = await request(app)
      .post('/address')
      .send({
        street: '123 Test St',
        city: 'Testville',
        state: 'TS',
        zipCode: '12345',
        country: 'Testland',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should return 400 for invalid create data', async () => {
    const response = await request(app)
      .post('/address')
      .send({
        city: 'Testville',
      });
    expect(response.status).toBe(400);
  });

  it('should get a list of addresses and return 200', async () => {
    const response = await request(app).get('/address');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get an address by id and return 200', async () => {
    const response = await request(app).get('/address/mock-id');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 'mock-id');
  });

  it('should update an address and return 200', async () => {
    const response = await request(app)
      .put('/address/mock-id')
      .send({
        city: 'New Testville',
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('city', 'New Testville');
  });

  it('should delete an address and return 204', async () => {
    const response = await request(app).delete('/address/mock-id');
    expect(response.status).toBe(204);
  });
});