import 'reflect-metadata';
import express, { Express } from 'express';
import request from 'supertest';
import { createVendorRoutes } from '../routes';
import { Dependencies } from '@/infrastructure/di';
import { success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { Vendor } from '../../domain/vendor.entity';

jest.mock('@/core/middlewares/auth.middleware', () => ({
  isAuthenticated: jest.fn((req, res, next) => next()),
  hasRole: jest.fn(() => (req, res, next) => next()),
}));

describe('VendorController', () => {
  let app: Express;
  let dependencies: Partial<Dependencies>;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    dependencies = {
      createVendorUseCase: { execute: jest.fn() },
      getVendorUseCase: { execute: jest.fn() },
      updateVendorUseCase: { execute: jest.fn() },
      deleteVendorUseCase: { execute: jest.fn() },
      listVendorsUseCase: { execute: jest.fn() },
    };
    app.use('/vendors', createVendorRoutes(dependencies as Dependencies));
  });

  describe('POST /vendors', () => {
    it('should create a vendor and return 201', async () => {
      const vendorInput = {
        name: 'Test Vendor',
        description: 'Test Description',
        email: 'test@example.com',
        phone: '+12345678901',
        address: '123 Test St',
        is_active: true,
      };

      const vendorEntity = Vendor.create({ ...vendorInput }, 'new-vendor-id').value;
      (dependencies.createVendorUseCase.execute as jest.Mock).mockResolvedValue(success(vendorEntity));

      const response = await request(app).post('/vendors').send(vendorInput);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(vendorInput.name);
      expect(dependencies.createVendorUseCase.execute).toHaveBeenCalledWith(vendorInput);
    });

    it('should return 400 if creation fails', async () => {
      const vendorInput = {
        name: 'Test Vendor',
        description: 'Test Description',
        email: 'test@example.com',
        phone: '+12345678901',
        address: '123 Test St',
        is_active: true,
      };

      (dependencies.createVendorUseCase.execute as jest.Mock).mockResolvedValue(failure(new Error('Creation failed')));

      const response = await request(app).post('/vendors').send(vendorInput);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Creation failed');
    });
  });

  describe('GET /vendors/:id', () => {
    it('should return a vendor by id', async () => {
      const vendorEntity = Vendor.create(
        {
          name: 'Test Vendor',
          description: 'Test Description',
          email: 'test@example.com',
          phone: '+12345678901',
          address: '123 Test St',
          is_active: true,
        },
        'vendor-id'
      ).value;

      (dependencies.getVendorUseCase.execute as jest.Mock).mockResolvedValue(success(vendorEntity));

      const response = await request(app).get('/vendors/vendor-id');

      expect(response.status).toBe(200);
      expect(response.body.id).toBe('vendor-id');
      expect(dependencies.getVendorUseCase.execute).toHaveBeenCalledWith('vendor-id');
    });

    it('should return 404 if vendor not found', async () => {
      (dependencies.getVendorUseCase.execute as jest.Mock).mockResolvedValue(failure(new Error('Not found')));

      const response = await request(app).get('/vendors/non-existent-id');

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /vendors/:id', () => {
    it('should update a vendor and return 200', async () => {
      const updateData = { name: 'Updated Name' };
      const vendorEntity = Vendor.create(
        {
          name: 'Updated Name',
          description: 'Test Description',
          email: 'test@example.com',
          phone: '+12345678901',
          address: '123 Test St',
          is_active: true,
        },
        'vendor-id'
      ).value;

      (dependencies.updateVendorUseCase.execute as jest.Mock).mockResolvedValue(success(vendorEntity));

      const response = await request(app).put('/vendors/vendor-id').send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Updated Name');
      expect(dependencies.updateVendorUseCase.execute).toHaveBeenCalledWith('vendor-id', updateData);
    });
  });

  describe('DELETE /vendors/:id', () => {
    it('should delete a vendor and return 204', async () => {
      (dependencies.deleteVendorUseCase.execute as jest.Mock).mockResolvedValue(success(null));

      const response = await request(app).delete('/vendors/vendor-id');

      expect(response.status).toBe(204);
      expect(dependencies.deleteVendorUseCase.execute).toHaveBeenCalledWith('vendor-id');
    });
  });

  describe('GET /vendors', () => {
    it('should return a list of vendors', async () => {
      const vendor1 = Vendor.create({ name: 'Vendor 1', description: 'desc 1', email: 'v1@test.com', phone: '+111', address: 'add 1', is_active: true }, '1').value;
      const vendor2 = Vendor.create({ name: 'Vendor 2', description: 'desc 2', email: 'v2@test.com', phone: '+222', address: 'add 2', is_active: true }, '2').value;
      (dependencies.listVendorsUseCase.execute as jest.Mock).mockResolvedValue(success([vendor1, vendor2]));

      const response = await request(app).get('/vendors');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe('Vendor 1');
    });
  });
});
