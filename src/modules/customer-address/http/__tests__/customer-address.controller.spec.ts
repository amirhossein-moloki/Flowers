import request from 'supertest';
import express from 'express';
import { createCustomerAddressRoutes } from '../routes';
import { CustomerAddressDependencies } from '../../customer-address.dependencies';
import { Result, success, failure } from '@/core/utils/result';
import { CustomerAddress } from '../../domain/customer-address.entity';
import { CustomerAddressDto } from '../../application/dtos/customer-address.dto';
import { HttpError } from '@/core/errors/http-error';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

jest.mock('@/core/middlewares/auth.middleware', () => ({
    isAuthenticated: jest.fn((req, res, next) => {
        // @ts-ignore
        req.user = { id: 'user-1', role: 'CUSTOMER' };
        next();
    }),
}));

const mockDependencies: DeepMockProxy<CustomerAddressDependencies> = mockDeep<CustomerAddressDependencies>();

const app = express();
app.use(express.json());
app.use('/customer-address', createCustomerAddressRoutes(mockDependencies));

describe('CustomerAddress Controller', () => {
  it('should create a new customer address and return 201', async () => {
    const customerAddressDto: CustomerAddressDto = {
        id: 'mock-id',
        user_id: 'user-1',
        address_id: 'address-1',
        label: 'Home',
        is_default: true,
    };
    mockDependencies.createCustomerAddressUseCase.execute.mockResolvedValue(success(customerAddressDto));
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
    expect(response.status).toBe(422);
  });

  it('should get a list of customer addresses and return 200', async () => {
    const customerAddressDto: CustomerAddressDto = {
        id: 'mock-id',
        user_id: 'user-1',
        address_id: 'address-1',
        label: 'Home',
        is_default: true,
    };
    mockDependencies.listCustomerAddressesUseCase.execute.mockResolvedValue(success([customerAddressDto]));
    const response = await request(app).get('/customer-address');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a customer address by id and return 200', async () => {
    const customerAddressDto: CustomerAddressDto = {
        id: 'mock-id',
        user_id: 'user-1',
        address_id: 'address-1',
        label: 'Home',
        is_default: true,
    };
    mockDependencies.getCustomerAddressUseCase.execute.mockResolvedValue(success(customerAddressDto));
    const response = await request(app).get('/customer-address/mock-id');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 'mock-id');
  });

  it('should update a customer address and return 200', async () => {
    const customerAddressDto: CustomerAddressDto = {
        id: 'mock-id',
        user_id: 'user-1',
        address_id: 'address-1',
        label: 'Work',
        is_default: false,
    };
    mockDependencies.updateCustomerAddressUseCase.execute.mockResolvedValue(success(customerAddressDto));
    const response = await request(app)
      .put('/customer-address/mock-id')
      .send({
        label: 'Work',
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('label', 'Work');
  });

  it('should delete a customer address and return 204', async () => {
    mockDependencies.deleteCustomerAddressUseCase.execute.mockResolvedValue(success(undefined));
    const response = await request(app).delete('/customer-address/mock-id');
    expect(response.status).toBe(204);
  });
});
