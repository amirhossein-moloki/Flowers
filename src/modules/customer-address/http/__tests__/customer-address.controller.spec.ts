import request from 'supertest';
import express from 'express';
import { customerAddressRouter } from '../routes';

const app = express();
app.use(express.json());
app.use('/customer-address', customerAddressRouter);

describe('CustomerAddress Controller', () => {
  it('should create a new customer address and return 201', async () => {
    const response = await request(app)
      .post('/customer-address')
      .send({
        user_id: 'user-1',
        address_id: 'address-1',
        label: 'Home',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should return 400 for invalid create data', async () => {
    const response = await request(app)
      .post('/customer-address')
      .send({
        user_id: 'user-1',
      });
    expect(response.status).toBe(400);
  });

  it('should get a list of customer addresses and return 200', async () => {
    const response = await request(app).get('/customer-address');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a customer address by id and return 200', async () => {
    const response = await request(app).get('/customer-address/mock-id');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 'mock-id');
  });

  it('should update a customer address and return 200', async () => {
    const response = await request(app)
      .put('/customer-address/mock-id')
      .send({
        label: 'Work',
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('label', 'Work');
  });

  it('should delete a customer address and return 204', async () => {
    const response = await request(app).delete('/customer-address/mock-id');
    expect(response.status).toBe(204);
  });
});