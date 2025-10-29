import request from 'supertest';
import express, { Express } from 'express';
import { createDriverLocationRoutes } from '../routes';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { HttpError } from '@/core/errors/http-error';
import { StatusCodes } from 'http-status-codes';
import {
  CreateDriverLocationUseCase,
  DeleteDriverLocationUseCase,
  GetDriverLocationUseCase,
  UpdateDriverLocationUseCase,
} from '../../application/use-cases';
import { Result, success, failure } from '@/core/logic/result';
import { DriverLocation } from '../../domain/driver-location.entity';
import { Dependencies } from '@/infrastructure/di';
import { DriverLocationDto } from '../dto/driver-location.dto';
import { DriverLocationMapper } from '../../presentation/mappers/driver-location.mapper';

describe('DriverLocationController', () => {
  let app: Express;
  let dependencies: DeepMockProxy<Dependencies>;

  beforeEach(() => {
    dependencies = mockDeep<Dependencies>();
    app = express();
    app.use(express.json());
    app.use('/driver-locations', createDriverLocationRoutes(dependencies));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockDriverLocationProps = {
    delivery_id: 'b4a1b4b0-5a4d-4a1e-8b0a-3e1b4a1b4a1b',
    courier_id: 'c4a1b4b0-5a4d-4a1e-8b0a-3e1b4a1b4a1c',
    lat: 34.0522,
    lng: -118.2437,
    speed_kmh: 60,
    heading_deg: 180,
    recorded_at: new Date('2023-10-27T10:00:00Z'),
  };

  const mockDriverLocationResult = DriverLocation.create(mockDriverLocationProps);
  const mockDriverLocation = mockDriverLocationResult.value as DriverLocation;

  describe('POST /driver-locations', () => {
    it('should create a driver location and return 201', async () => {
      const createDto = {
        ...mockDriverLocationProps,
        recorded_at: mockDriverLocationProps.recorded_at.toISOString(),
      };
      dependencies.createDriverLocationUseCase.execute.mockResolvedValue(success(DriverLocationMapper.toDto(mockDriverLocation)));

      const response = await request(app)
        .post('/driver-locations')
        .send(createDto);

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body.id).toBe(mockDriverLocation.id);
      expect(dependencies.createDriverLocationUseCase.execute).toHaveBeenCalledWith(createDto);
    });

    it('should return 400 if creation fails', async () => {
      const createDto = {
        ...mockDriverLocationProps,
        recorded_at: mockDriverLocationProps.recorded_at.toISOString(),
      };
      const error = HttpError.badRequest('Creation failed');
      dependencies.createDriverLocationUseCase.execute.mockResolvedValue(failure(error));

      const response = await request(app)
        .post('/driver-locations')
        .send(createDto);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe('GET /driver-locations/:id', () => {
    it('should return a driver location by id', async () => {
      dependencies.getDriverLocationUseCase.execute.mockResolvedValue(success(DriverLocationMapper.toDto(mockDriverLocation)));

      const response = await request(app).get(`/driver-locations/${mockDriverLocation.id}`);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.id).toBe(mockDriverLocation.id);
      expect(dependencies.getDriverLocationUseCase.execute).toHaveBeenCalledWith(mockDriverLocation.id);
    });

    it('should return 404 if driver location not found', async () => {
      dependencies.getDriverLocationUseCase.execute.mockResolvedValue(failure(HttpError.notFound('')));

      const response = await request(app).get(`/driver-locations/non-existent-id`);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('PUT /driver-locations/:id', () => {
    it('should update a driver location and return 200', async () => {
      const updateDto = { lat: 35.1234, lng: -119.5678 };
      const updatedEntityResult = DriverLocation.create({ ...mockDriverLocationProps, ...updateDto });
      const updatedEntity = updatedEntityResult.value as DriverLocation;
      dependencies.updateDriverLocationUseCase.execute.mockResolvedValue(success(DriverLocationMapper.toDto(updatedEntity)));

      const response = await request(app)
        .put(`/driver-locations/${mockDriverLocation.id}`)
        .send(updateDto);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.lat).toBe(updateDto.lat);
      expect(dependencies.updateDriverLocationUseCase.execute).toHaveBeenCalledWith(mockDriverLocation.id, updateDto);
    });
  });

  describe('DELETE /driver-locations/:id', () => {
    it('should delete a driver location and return 204', async () => {
      dependencies.deleteDriverLocationUseCase.execute.mockResolvedValue(success(undefined));

      const response = await request(app).delete(`/driver-locations/${mockDriverLocation.id}`);

      expect(response.status).toBe(StatusCodes.NO_CONTENT);
      expect(dependencies.deleteDriverLocationUseCase.execute).toHaveBeenCalledWith(mockDriverLocation.id);
    });
  });
});
