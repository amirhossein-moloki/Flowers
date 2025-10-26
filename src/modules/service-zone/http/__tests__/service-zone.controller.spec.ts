import 'reflect-metadata';
import express, { Express } from 'express';
import request from 'supertest';
import { createServiceZoneRoutes } from '../routes';
import { Dependencies } from '@/infrastructure/di';
import { success, failure } from '@/core/utils/result';
import { ServiceZone } from '../../domain/service-zone.entity';

describe('ServiceZoneController', () => {
  let app: Express;
  let dependencies: Partial<Dependencies>;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    dependencies = {
      getServiceZoneUseCase: { execute: jest.fn() } as any,
      listServiceZonesUseCase: { execute: jest.fn() } as any,
    };
    app.use('/service-zones', createServiceZoneRoutes(dependencies as Dependencies));
  });

  describe('GET /service-zones/:id', () => {
    it('should return a service zone by id', async () => {
      const serviceZoneResult = ServiceZone.create(
        {
          name: 'Test Service Zone',
          geo_json: {},
          is_active: true,
        },
        'service-zone-id'
      );

      if (!serviceZoneResult.success) {
        throw new Error('Failed to create test service zone');
      }
      const serviceZoneEntity = serviceZoneResult.value;

      (dependencies.getServiceZoneUseCase!.execute as jest.Mock).mockResolvedValue(success(serviceZoneEntity));

      const response = await request(app).get('/service-zones/service-zone-id');

      expect(response.status).toBe(200);
      expect(response.body.id).toBe('service-zone-id');
      expect(dependencies.getServiceZoneUseCase!.execute).toHaveBeenCalledWith('service-zone-id');
    });

    it('should return 404 if service zone not found', async () => {
      (dependencies.getServiceZoneUseCase!.execute as jest.Mock).mockResolvedValue(failure(new Error('Not found')));

      const response = await request(app).get('/service-zones/non-existent-id');

      expect(response.status).toBe(404);
    });
  });

  describe('GET /service-zones', () => {
    it('should return a list of service zones', async () => {
      const serviceZone1Result = ServiceZone.create({ name: 'Service Zone 1', geo_json: {}, is_active: true }, '1');
      const serviceZone2Result = ServiceZone.create({ name: 'Service Zone 2', geo_json: {}, is_active: true }, '2');

      if (!serviceZone1Result.success || !serviceZone2Result.success) {
        throw new Error('Failed to create test service zones');
      }
      const serviceZone1 = serviceZone1Result.value;
      const serviceZone2 = serviceZone2Result.value;

      (dependencies.listServiceZonesUseCase!.execute as jest.Mock).mockResolvedValue(success([serviceZone1, serviceZone2]));

      const response = await request(app).get('/service-zones');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe('Service Zone 1');
    });
  });
});
