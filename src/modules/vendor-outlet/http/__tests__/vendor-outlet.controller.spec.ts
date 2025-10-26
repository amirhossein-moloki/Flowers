import 'reflect-metadata';
import request from 'supertest';
import express from 'express';
import { createVendorOutletRoutes } from '../routes';
import { VendorOutletController } from '../controller';
import { VendorOutletDependencies } from '../../vendor-outlet.dependencies';
import { CreateVendorOutletUseCase } from '../../application/use-cases/create-vendor-outlet.usecase';
import { GetVendorOutletUseCase } from '../../application/use-cases/get-vendor-outlet.usecase';
import { UpdateVendorOutletUseCase } from '../../application/use-cases/update-vendor-outlet.usecase';
import { DeleteVendorOutletUseCase } from '../../application/use-cases/delete-vendor-outlet.usecase';
import { ListVendorOutletsUseCase } from '../../application/use-cases/list-vendor-outlets.usecase';
import { MockVendorOutletRepository } from './mocks/vendor-outlet.repository.mock';
import { MockVendorRepository } from './mocks/vendor.repository.mock';
import { VendorOutlet } from '../../domain/vendor-outlet.entity';
import { Vendor } from '../../../vendor/domain/vendor.entity';

import { Request, Response, NextFunction } from 'express';

jest.mock('@/core/middlewares/auth.middleware', () => ({
  isAuthenticated: jest.fn((req: Request, res: Response, next: NextFunction) => next()),
  hasRole: jest.fn(() => (req: Request, res: Response, next: NextFunction) => next()),
}));

describe('VendorOutletController', () => {
  let app: express.Express;
  let mockOutletRepository: MockVendorOutletRepository;
  let mockVendorRepository: MockVendorRepository;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    mockOutletRepository = new MockVendorOutletRepository();
    mockVendorRepository = new MockVendorRepository();

    const mockDependencies: VendorOutletDependencies = {
      createVendorOutletUseCase: new CreateVendorOutletUseCase(
        mockOutletRepository,
      ),
      getVendorOutletUseCase: new GetVendorOutletUseCase(
        mockOutletRepository,
        mockVendorRepository,
      ),
      updateVendorOutletUseCase: new UpdateVendorOutletUseCase(
        mockOutletRepository,
      ),
      deleteVendorOutletUseCase: new DeleteVendorOutletUseCase(
        mockOutletRepository,
      ),
      listVendorOutletsUseCase: new ListVendorOutletsUseCase(
        mockOutletRepository,
        mockVendorRepository,
      ),
    };

    const routes = createVendorOutletRoutes(mockDependencies);
    app.use('/vendor-outlets', routes);
  });

  describe('POST /vendor-outlets', () => {
    it('should return 201', async () => {
      const res = await request(app).post('/vendor-outlets').send({
        vendorId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        name: 'Test Outlet',
        address: '123 Test St',
        latitude: 0,
        longitude: 0,
      });
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Test Outlet');
    });

    it('should return 400 on validation error', async () => {
      const res = await request(app).post('/vendor-outlets').send({
        name: 'Test Outlet',
        address: '123 Test St',
        latitude: 0,
        longitude: 0,
      });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /vendor-outlets/:id', () => {
    it('should return 200', async () => {
      const vendorResult = Vendor.create({
        name: 'Test Vendor',
        email: 'test@test.com',
        phone: '1234567890',
        address: '123 Test St',
        description: 'Test Vendor',
        is_active: true,
      });
      if (!vendorResult.success) throw new Error('Failed to create vendor');
      const vendor = vendorResult.value;
      await mockVendorRepository.save(vendor);

      const outletResult = VendorOutlet.create({
        vendorId: vendor.id,
        name: 'Test Outlet',
        address: '123 Test St',
        latitude: 0,
        longitude: 0,
        is_active: true,
      });
      if (!outletResult.success) throw new Error('Failed to create outlet');
      const outlet = outletResult.value;
      await mockOutletRepository.save(outlet);

      const res = await request(app).get(`/vendor-outlets/${outlet.id}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(outlet.id);
      expect(res.body.vendor.id).toBe(vendor.id);
    });
  });

  describe('PUT /vendor-outlets/:id', () => {
    it('should return 200', async () => {
      const outletResult = VendorOutlet.create({
        vendorId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        name: 'Test Outlet',
        address: '123 Test St',
        latitude: 0,
        longitude: 0,
        is_active: true,
      });
      if (!outletResult.success) throw new Error('Failed to create outlet');
      const outlet = outletResult.value;
      await mockOutletRepository.save(outlet);

      const res = await request(app).put(`/vendor-outlets/${outlet.id}`).send({
        name: 'Updated Outlet',
      });
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Updated Outlet');
    });
  });

  describe('DELETE /vendor-outlets/:id', () => {
    it('should return 204', async () => {
      const outletResult = VendorOutlet.create({
        vendorId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        name: 'Test Outlet',
        address: '123 Test St',
        latitude: 0,
        longitude: 0,
        is_active: true,
      });
      if (!outletResult.success) throw new Error('Failed to create outlet');
      const outlet = outletResult.value;
      await mockOutletRepository.save(outlet);

      const res = await request(app).delete(`/vendor-outlets/${outlet.id}`);
      expect(res.status).toBe(204);
    });
  });

  describe('GET /vendor-outlets', () => {
    it('should return 200', async () => {
      const vendorResult = Vendor.create({
        name: 'Test Vendor',
        email: 'test@test.com',
        phone: '1234567890',
        address: '123 Test St',
        description: 'Test Vendor',
        is_active: true,
      });
      if (!vendorResult.success) throw new Error('Failed to create vendor');
      const vendor = vendorResult.value;
      await mockVendorRepository.save(vendor);

      const outletResult = VendorOutlet.create({
        vendorId: vendor.id,
        name: 'Test Outlet',
        address: '123 Test St',
        latitude: 0,
        longitude: 0,
        is_active: true,
      });
      if (!outletResult.success) throw new Error('Failed to create outlet');
      const outlet = outletResult.value;
      await mockOutletRepository.save(outlet);

      const res = await request(app).get('/vendor-outlets');
      expect(res.status).toBe(200);
      expect(res.body[0].id).toBe(outlet.id);
      expect(res.body[0].vendor.id).toBe(vendor.id);
    });
  });
});
