import request from 'supertest';
import express from 'express';
import { createServiceZoneRoutes } from '../routes';
import { GetServiceZoneUseCase } from '../../application/use-cases/get-service-zone.usecase';
import { ListServiceZonesUseCase } from '../../application/use-cases/list-service-zones.usecase';
import { success, failure } from '@/core/utils/result';
import { ServiceZone } from '../../domain/service-zone.entity';
import { AppDependencies } from '@/app';
import { prismaMock } from '../../../__tests__/helpers/prisma-mock.helper';

const mockGetServiceZoneUseCase = {
  execute: jest.fn(),
};
const mockListServiceZonesUseCase = {
  execute: jest.fn(),
};

jest.mock('../../application/use-cases/get-service-zone.usecase', () => {
  return {
    GetServiceZoneUseCase: jest.fn().mockImplementation(() => {
      return mockGetServiceZoneUseCase;
    }),
  };
});

jest.mock('../../application/use-cases/list-service-zones.usecase', () => {
  return {
    ListServiceZonesUseCase: jest.fn().mockImplementation(() => {
      return mockListServiceZonesUseCase;
    }),
  };
});

const app = express();
app.use(express.json());
const mockDependencies = {
  prisma: prismaMock as any,
} as AppDependencies;
app.use('/service-zones', createServiceZoneRoutes(mockDependencies));

describe('ServiceZoneController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /service-zones/:id', () => {
    it('should return a service zone by id', async () => {
      const serviceZoneEntity = ServiceZone.create(
        {
          name: 'Test Service Zone',
          city: 'Test City',
          polygon_geojson: {},
          is_active: true,
        },
        'service-zone-id'
      ).value;

      mockGetServiceZoneUseCase.execute.mockResolvedValue(success(serviceZoneEntity));

      const response = await request(app).get('/service-zones/service-zone-id');

      expect(response.status).toBe(200);
      expect(response.body.id).toBe('service-zone-id');
      expect(mockGetServiceZoneUseCase.execute).toHaveBeenCalledWith('service-zone-id');
    });

    it('should return 404 if service zone not found', async () => {
      mockGetServiceZoneUseCase.execute.mockResolvedValue(failure(new Error('Not found')));

      const response = await request(app).get('/service-zones/non-existent-id');

      expect(response.status).toBe(404);
    });
  });

  describe('GET /service-zones', () => {
    it('should return a list of service zones', async () => {
      const serviceZone1 = ServiceZone.create({ name: 'Service Zone 1', city: 'City 1', polygon_geojson: {}, is_active: true }, '1').value;
      const serviceZone2 = ServiceZone.create({ name: 'Service Zone 2', city: 'City 2', polygon_geojson: {}, is_active: true }, '2').value;
      mockListServiceZonesUseCase.execute.mockResolvedValue(success([serviceZone1, serviceZone2]));

      const response = await request(app).get('/service-zones');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe('Service Zone 1');
    });
  });
});
