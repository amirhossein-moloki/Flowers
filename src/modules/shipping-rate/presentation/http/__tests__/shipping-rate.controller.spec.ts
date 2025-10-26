import 'reflect-metadata';
import express, { Express } from 'express';
import request from 'supertest';
import { createShippingRateRoutes } from '../shipping-rate.routes';
import { Dependencies } from '@/infrastructure/di';
import { success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { ShippingRate } from '../../../domain/shipping-rate.entity';
import { Request, Response, NextFunction } from 'express';

jest.mock('@/core/middlewares/auth.middleware', () => ({
  isAuthenticated: (req: Request, res: Response, next: NextFunction) => next(),
  hasRole: (roles: string[]) => (req: Request, res: Response, next: NextFunction) => next(),
}));

const validUUID = '123e4567-e89b-12d3-a456-426614174000';

jest.mock('uuid', () => ({
  v4: () => validUUID,
}));

describe('ShippingRateController', () => {
  let app: Express;
  let dependencies: Partial<Dependencies>;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    dependencies = {
      createShippingRateUseCase: { execute: jest.fn() } as any,
      updateShippingRateUseCase: { execute: jest.fn() } as any,
      deleteShippingRateUseCase: { execute: jest.fn() } as any,
      getShippingRateUseCase: { execute: jest.fn() } as any,
      listShippingRatesUseCase: { execute: jest.fn() } as any,
      calculateShippingRateUseCase: { execute: jest.fn() } as any,
    };
    app.use('/shipping-rates', createShippingRateRoutes(dependencies as Dependencies));
  });

  describe('POST /shipping-rates', () => {
    it('should return 201 on successful creation', async () => {
      const dto = { service_zone_id: validUUID, rate: 10, currency: 'USD', weight_unit: 'kg', min_weight: 0, max_weight: 10, is_active: true };
      const entityResult = ShippingRate.create({ ...dto, createdAt: new Date(), updatedAt: new Date() }, validUUID);
      if (!entityResult.success) throw new Error('Failed to create entity');
      const entity = entityResult.value;
      (dependencies.createShippingRateUseCase!.execute as jest.Mock).mockResolvedValue(success(entity));

      await request(app)
        .post('/shipping-rates')
        .send(dto)
        .expect(201)
        .then(response => {
          expect(response.body.id).toEqual(validUUID);
          expect(response.body.service_zone_id).toEqual(validUUID);
          expect(response.body.rate).toEqual(10);
        });
    });

    it('should return 500 on failure', async () => {
      const dto = { service_zone_id: validUUID, rate: 10, currency: 'USD', weight_unit: 'kg', min_weight: 0, max_weight: 10 };
      (dependencies.createShippingRateUseCase!.execute as jest.Mock).mockResolvedValue(failure(HttpError.internalServerError('Test error')));

      await request(app)
        .post('/shipping-rates')
        .send(dto)
        .expect(500);
    });
  });

  describe('PUT /shipping-rates/:id', () => {
    it('should return 200 on successful update', async () => {
      const dto = { rate: 12 };
      const props = { service_zone_id: validUUID, rate: 12, currency: 'USD', weight_unit: 'kg', min_weight: 0, max_weight: 10, is_active: true, createdAt: new Date(), updatedAt: new Date() };
      const entityResult = ShippingRate.create(props, 'some-id');
      if (!entityResult.success) throw new Error('Failed to create entity');
      const entity = entityResult.value;
      (dependencies.updateShippingRateUseCase!.execute as jest.Mock).mockResolvedValue(success(entity));

      await request(app)
        .put('/shipping-rates/some-id')
        .send(dto)
        .expect(200)
        .then(response => {
          expect(response.body).toEqual({
            id: 'some-id',
            service_zone_id: validUUID,
            rate: 12,
            currency: 'USD',
            weight_unit: 'kg',
            min_weight: 0,
            max_weight: 10,
            is_active: true,
            createdAt: (entity.props.createdAt as Date).toISOString(),
            updatedAt: (entity.props.updatedAt as Date).toISOString(),
          });
        });
    });
  });

  describe('DELETE /shipping-rates/:id', () => {
    it('should return 204 on successful deletion', async () => {
      (dependencies.deleteShippingRateUseCase!.execute as jest.Mock).mockResolvedValue(success(undefined));

      await request(app)
        .delete('/shipping-rates/some-id')
        .expect(204);
    });
  });

  describe('GET /shipping-rates/:id', () => {
    it('should return 200 and the shipping rate on successful retrieval', async () => {
      const props = { service_zone_id: validUUID, rate: 10, currency: 'USD', weight_unit: 'kg', min_weight: 0, max_weight: 10, is_active: true, createdAt: new Date(), updatedAt: new Date() };
      const entityResult = ShippingRate.create(props, 'some-id');
      if (!entityResult.success) throw new Error('Failed to create entity');
      const entity = entityResult.value;
      (dependencies.getShippingRateUseCase!.execute as jest.Mock).mockResolvedValue(success(entity));

      await request(app)
        .get('/shipping-rates/some-id')
        .expect(200)
        .then(response => {
          expect(response.body).toEqual({
            id: 'some-id',
            service_zone_id: validUUID,
            rate: 10,
            currency: 'USD',
            weight_unit: 'kg',
            min_weight: 0,
            max_weight: 10,
            is_active: true,
            createdAt: (entity.props.createdAt as Date).toISOString(),
            updatedAt: (entity.props.updatedAt as Date).toISOString(),
          });
        });
    });
  });

  describe('GET /shipping-rates', () => {
    it('should return 200 and a list of shipping rates on successful retrieval', async () => {
      const props = { service_zone_id: validUUID, rate: 10, currency: 'USD', weight_unit: 'kg', min_weight: 0, max_weight: 10, is_active: true, createdAt: new Date(), updatedAt: new Date() };
      const entityResult = ShippingRate.create(props, 'some-id');
      if (!entityResult.success) throw new Error('Failed to create entity');
      const entity = entityResult.value;
      (dependencies.listShippingRatesUseCase!.execute as jest.Mock).mockResolvedValue(success([entity]));

      await request(app)
        .get('/shipping-rates')
        .expect(200)
        .then(response => {
          expect(response.body).toEqual([{
            id: 'some-id',
            service_zone_id: validUUID,
            rate: 10,
            currency: 'USD',
            weight_unit: 'kg',
            min_weight: 0,
            max_weight: 10,
            is_active: true,
            createdAt: (entity.props.createdAt as Date).toISOString(),
            updatedAt: (entity.props.updatedAt as Date).toISOString(),
          }]);
        });
    });
  });

  describe('POST /shipping-rates/calculate', () => {
    it('should return 200 and the calculated rate on successful calculation', async () => {
      const dto = { weight: 5, service_zone_id: validUUID };
      (dependencies.calculateShippingRateUseCase!.execute as jest.Mock).mockResolvedValue(success(10));

      await request(app)
        .post('/shipping-rates/calculate')
        .send(dto)
        .expect(200)
        .then(response => {
          expect(response.body).toEqual({ rate: 10 });
        });
    });
  });
});
