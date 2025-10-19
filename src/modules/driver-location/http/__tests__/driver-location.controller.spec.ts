import request from 'supertest';
import express, { Express } from 'express';
import { driverLocationRoutes } from '../routes';
import { DIContainer } from '@/infrastructure/di';
import { CreateDriverLocationUseCase } from '../../application/use-cases/create-driver-location.usecase';
import { GetDriverLocationUseCase } from '../../application/use-cases/get-driver-location.usecase';
import { UpdateDriverLocationUseCase } from '../../application/use-cases/update-driver-location.usecase';
import { DeleteDriverLocationUseCase } from '../../application/use-cases/delete-driver-location.usecase';
import { success, failure } from '@/core/utils/result';
import { DriverLocation } from '../../domain/driver-location.entity';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { HttpError } from '@/core/errors/http-error';
import { StatusCodes } from 'http-status-codes';

describe('DriverLocationController', () => {
  let app: Express;
  let diContainer: DeepMockProxy<DIContainer>;
  let createDriverLocationUseCase: DeepMockProxy<CreateDriverLocationUseCase>;
  let getDriverLocationUseCase: DeepMockProxy<GetDriverLocationUseCase>;
  let updateDriverLocationUseCase: DeepMockProxy<UpdateDriverLocationUseCase>;
  let deleteDriverLocationUseCase: DeepMockProxy<DeleteDriverLocationUseCase>;

  beforeEach(() => {
    diContainer = mockDeep<DIContainer>();
    createDriverLocationUseCase = mockDeep<CreateDriverLocationUseCase>();
    getDriverLocationUseCase = mockDeep<GetDriverLocationUseCase>();
    updateDriverLocationUseCase = mockDeep<UpdateDriverLocationUseCase>();
    deleteDriverLocationUseCase = mockDeep<DeleteDriverLocationUseCase>();

    diContainer.resolve.mockImplementation((token: any) => {
      if (token === 'createDriverLocationUseCase') return createDriverLocationUseCase;
      if (token === 'getDriverLocationUseCase') return getDriverLocationUseCase;
      if (token === 'updateDriverLocationUseCase') return updateDriverLocationUseCase;
      if (token === 'deleteDriverLocationUseCase') return deleteDriverLocationUseCase;
      throw new Error(`Token not mocked: ${token}`);
    });

    app = express();
    app.use(express.json());
    app.use('/driver-locations', driverLocationRoutes(diContainer));
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

  const mockDriverLocation = DriverLocation.create(mockDriverLocationProps, 'a4a1b4b0-5a4d-4a1e-8b0a-3e1b4a1b4a1a').value as DriverLocation;


  describe('POST /driver-locations', () => {
    it('should create a driver location and return 201', async () => {
      const createDto = {
        ...mockDriverLocationProps,
        recorded_at: mockDriverLocationProps.recorded_at.toISOString(),
      };
      createDriverLocationUseCase.execute.mockResolvedValue(success(mockDriverLocation));

      const response = await request(app)
        .post('/driver-locations')
        .send(createDto);

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body.id).toBe(mockDriverLocation.id);
      expect(createDriverLocationUseCase.execute).toHaveBeenCalledWith(createDto);
    });

    it('should return 400 if creation fails', async () => {
        const createDto = {
            ...mockDriverLocationProps,
            recorded_at: mockDriverLocationProps.recorded_at.toISOString(),
          };
      const error = HttpError.badRequest('Creation failed');
      createDriverLocationUseCase.execute.mockResolvedValue(failure(error));

      const response = await request(app)
        .post('/driver-locations')
        .send(createDto);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe('GET /driver-locations/:id', () => {
    it('should return a driver location by id', async () => {
      getDriverLocationUseCase.execute.mockResolvedValue(success(mockDriverLocation as any));

      const response = await request(app).get(`/driver-locations/${mockDriverLocation.id}`);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.id).toBe(mockDriverLocation.id);
      expect(getDriverLocationUseCase.execute).toHaveBeenCalledWith(mockDriverLocation.id);
    });

    it('should return 404 if driver location not found', async () => {
      getDriverLocationUseCase.execute.mockResolvedValue(success(null));

      const response = await request(app).get(`/driver-locations/non-existent-id`);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('PUT /driver-locations/:id', () => {
    it('should update a driver location and return 200', async () => {
      const updateDto = { lat: 35.1234, lng: -119.5678 };
      const updatedDto = { ...mockDriverLocationProps, ...updateDto };

      updateDriverLocationUseCase.execute.mockResolvedValue(success(updatedDto as any));

      const response = await request(app)
        .put(`/driver-locations/${mockDriverLocation.id}`)
        .send(updateDto);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.lat).toBe(updateDto.lat);
      expect(updateDriverLocationUseCase.execute).toHaveBeenCalledWith(mockDriverLocation.id, updateDto);
    });
  });

  describe('DELETE /driver-locations/:id', () => {
    it('should delete a driver location and return 204', async () => {
      deleteDriverLocationUseCase.execute.mockResolvedValue(success(undefined));

      const response = await request(app).delete(`/driver-locations/${mockDriverLocation.id}`);

      expect(response.status).toBe(StatusCodes.NO_CONTENT);
      expect(deleteDriverLocationUseCase.execute).toHaveBeenCalledWith(mockDriverLocation.id);
    });
  });
});
