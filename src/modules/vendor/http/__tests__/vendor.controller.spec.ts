import request from 'supertest';
import express from 'express';
import { vendorRoutes } from '../routes';
import { CreateVendorUseCase } from '../../application/use-cases/create-vendor.usecase';
import { GetVendorUseCase } from '../../application/use-cases/get-vendor.usecase';
import { UpdateVendorUseCase } from '../../application/use-cases/update-vendor.usecase';
import { DeleteVendorUseCase } from '../../application/use-cases/delete-vendor.usecase';
import { ListVendorsUseCase } from '../../application/use-cases/list-vendors.usecase';
import { success, failure } from '@/core/utils/result';
import { Vendor } from '../../domain/vendor.entity';
import { createVendorRoutes } from '../routes';

const mockCreateVendorUseCase = {
  execute: jest.fn(),
};
const mockGetVendorUseCase = {
  execute: jest.fn(),
};
const mockUpdateVendorUseCase = {
  execute: jest.fn(),
};
const mockDeleteVendorUseCase = {
  execute: jest.fn(),
};
const mockListVendorsUseCase = {
  execute: jest.fn(),
};

jest.mock('../../application/use-cases/create-vendor.usecase', () => {
  return {
    CreateVendorUseCase: jest.fn().mockImplementation(() => {
      return mockCreateVendorUseCase;
    }),
  };
});

jest.mock('../../application/use-cases/get-vendor.usecase', () => {
  return {
    GetVendorUseCase: jest.fn().mockImplementation(() => {
      return mockGetVendorUseCase;
    }),
  };
});

jest.mock('../../application/use-cases/update-vendor.usecase', () => {
  return {
    UpdateVendorUseCase: jest.fn().mockImplementation(() => {
      return mockUpdateVendorUseCase;
    }),
  };
});

jest.mock('../../application/use-cases/delete-vendor.usecase', () => {
  return {
    DeleteVendorUseCase: jest.fn().mockImplementation(() => {
      return mockDeleteVendorUseCase;
    }),
  };
});

jest.mock('../../application/use-cases/list-vendors.usecase', () => {
  return {
    ListVendorsUseCase: jest.fn().mockImplementation(() => {
      return mockListVendorsUseCase;
    }),
  };
});

import { AppDependencies } from '@/app';
import { prismaMock } from '../../../__tests__/helpers/prisma-mock.helper';

const app = express();
app.use(express.json());
const mockDependencies = {
  prisma: prismaMock as any,
} as AppDependencies;
app.use('/vendors', createVendorRoutes(mockDependencies));

describe('VendorController', () => {
  afterEach(() => {
    jest.clearAllMocks();
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
      mockCreateVendorUseCase.execute.mockResolvedValue(success(vendorEntity));

      const response = await request(app).post('/vendors').send(vendorInput);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(vendorInput.name);
      expect(mockCreateVendorUseCase.execute).toHaveBeenCalledWith(vendorInput);
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

      mockCreateVendorUseCase.execute.mockResolvedValue(failure(new Error('Creation failed')));

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

      mockGetVendorUseCase.execute.mockResolvedValue(success(vendorEntity));

      const response = await request(app).get('/vendors/vendor-id');

      expect(response.status).toBe(200);
      expect(response.body.id).toBe('vendor-id');
      expect(mockGetVendorUseCase.execute).toHaveBeenCalledWith('vendor-id');
    });

    it('should return 404 if vendor not found', async () => {
      mockGetVendorUseCase.execute.mockResolvedValue(failure(new Error('Not found')));

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

      mockUpdateVendorUseCase.execute.mockResolvedValue(success(vendorEntity));

      const response = await request(app).put('/vendors/vendor-id').send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Updated Name');
      expect(mockUpdateVendorUseCase.execute).toHaveBeenCalledWith('vendor-id', updateData);
    });
  });

  describe('DELETE /vendors/:id', () => {
    it('should delete a vendor and return 204', async () => {
      mockDeleteVendorUseCase.execute.mockResolvedValue(success(null));

      const response = await request(app).delete('/vendors/vendor-id');

      expect(response.status).toBe(204);
      expect(mockDeleteVendorUseCase.execute).toHaveBeenCalledWith('vendor-id');
    });
  });

  describe('GET /vendors', () => {
    it('should return a list of vendors', async () => {
      const vendor1 = Vendor.create({ name: 'Vendor 1', description: 'desc 1', email: 'v1@test.com', phone: '+111', address: 'add 1', is_active: true }, '1').value;
      const vendor2 = Vendor.create({ name: 'Vendor 2', description: 'desc 2', email: 'v2@test.com', phone: '+222', address: 'add 2', is_active: true }, '2').value;
      mockListVendorsUseCase.execute.mockResolvedValue(success([vendor1, vendor2]));

      const response = await request(app).get('/vendors');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe('Vendor 1');
    });
  });
});
