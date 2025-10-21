import request from 'supertest';
import express from 'express';
import { createAddressRoutes } from '../routes';
import { AddressDependencies } from '../../address.dependencies';
import { Result, success } from '@/core/utils/result';
import { Address } from '../../domain/address.entity';

jest.mock('@/core/middlewares/auth.middleware', () => ({
    isAuthenticated: jest.fn((req, res, next) => {
        // @ts-ignore
        req.user = { id: 'user-1', role: 'CUSTOMER' };
        next();
    }),
}));

const mockDependencies: AddressDependencies = {
    createAddressUseCase: {
        execute: jest.fn(async (dto) => {
            const addressResult = Address.create({
                ...dto,
            }, 'mock-id');
            return success(addressResult.value);
        }),
    },
    getAddressUseCase: {
        execute: jest.fn(async (id) => {
            const addressResult = Address.create({
                street: '123 Test St',
                city: 'Testville',
                state: 'TS',
                zipCode: '12345',
                country: 'Testland',
            }, id);
            return success(addressResult.value);
        }),
    },
    listAddressesUseCase: {
        execute: jest.fn(async () => {
            const addressResult = Address.create({
                street: '123 Test St',
                city: 'Testville',
                state: 'TS',
                zipCode: '12345',
                country: 'Testland',
            }, 'mock-id');
            return success([addressResult.value]);
        }),
    },
    updateAddressUseCase: {
        execute: jest.fn(async (dto) => {
            const addressResult = Address.create({
                street: '123 Test St',
                city: 'New Testville',
                state: 'TS',
                zipCode: '12345',
                country: 'Testland',
            }, 'mock-id');
            return success(addressResult.value);
        }),
    },
    deleteAddressUseCase: {
        execute: jest.fn(async () => success(undefined)),
    },
};

const app = express();
app.use(express.json());
app.use('/address', createAddressRoutes(mockDependencies));

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