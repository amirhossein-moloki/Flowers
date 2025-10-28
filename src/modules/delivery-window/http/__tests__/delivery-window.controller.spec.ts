import 'reflect-metadata';
import request from 'supertest';
import express, { Express } from 'express';
import { DeliveryWindowController } from '../controller';
import { mock, mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { CreateDeliveryWindowUseCase } from '../../application/use-cases/create-delivery-window.usecase';
import { GetAllDeliveryWindowsUseCase } from '../../application/use-cases/get-all-delivery-windows.usecase';
import { GetDeliveryWindowByIdUseCase } from '../../application/use-cases/get-delivery-window-by-id.usecase';
import { UpdateDeliveryWindowUseCase } from '../../application/use-cases/update-delivery-window.usecase';
import { DeleteDeliveryWindowUseCase } from '../../application/use-cases/delete-delivery-window.usecase';
import { success, failure } from '@/core/utils/result';
import { DeliveryWindow } from '../../domain/delivery-window.entity';
import { DeliveryWindowPresenter } from '../presenters/delivery-window.presenter';
import { HttpError } from '@/core/errors/http-error';

describe('DeliveryWindow Routes', () => {
  let app: Express;
  let mockCreateUseCase: DeepMockProxy<CreateDeliveryWindowUseCase>;
  let mockGetAllUseCase: DeepMockProxy<GetAllDeliveryWindowsUseCase>;
  let mockGetByIdUseCase: DeepMockProxy<GetDeliveryWindowByIdUseCase>;
  let mockUpdateUseCase: DeepMockProxy<UpdateDeliveryWindowUseCase>;
  let mockDeleteUseCase: DeepMockProxy<DeleteDeliveryWindowUseCase>;

  const mockDeliveryWindowResult = DeliveryWindow.create({
    id: '123',
    label: 'Morning',
    start_time: '09:00',
    end_time: '12:00',
    cutoff_time: '08:00',
    zone_id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    is_active: true,
  });

  if (!mockDeliveryWindowResult.success) {
    throw mockDeliveryWindowResult.error;
  }
  const mockDeliveryWindow = mockDeliveryWindowResult.value;

  const mockDeliveryWindowDto = DeliveryWindowPresenter.toJSON(mockDeliveryWindow);

  beforeEach(() => {
    app = express();
    app.use(express.json());

    mockCreateUseCase = mockDeep<CreateDeliveryWindowUseCase>();
    mockGetAllUseCase = mockDeep<GetAllDeliveryWindowsUseCase>();
    mockGetByIdUseCase = mockDeep<GetDeliveryWindowByIdUseCase>();
    mockUpdateUseCase = mockDeep<UpdateDeliveryWindowUseCase>();
    mockDeleteUseCase = mockDeep<DeleteDeliveryWindowUseCase>();

    const controller = new DeliveryWindowController(
        mockCreateUseCase,
        mockGetAllUseCase,
        mockGetByIdUseCase,
        mockUpdateUseCase,
        mockDeleteUseCase
    );

    const router = express.Router();
    router.post('/', controller.create);
    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);
    app.use('/delivery-windows', router);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /delivery-windows', () => {
    it('should create a new delivery window', async () => {
        mockCreateUseCase.execute.mockResolvedValue(success(mockDeliveryWindow));

      const response = await request(app)
        .post('/delivery-windows')
        .send({
          label: 'Morning',
          start_time: '09:00',
          end_time: '12:00',
          cutoff_time: '08:00',
          zone_id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockDeliveryWindowDto);
    });

    it('should return 400 on failure', async () => {
        mockCreateUseCase.execute.mockResolvedValue(failure(HttpError.badRequest('Creation failed')));

        const response = await request(app)
        .post('/delivery-windows')
        .send({
          label: 'Morning',
          start_time: '09:00',
          end_time: '12:00',
          cutoff_time: '08:00',
          zone_id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /delivery-windows', () => {
    it('should return all delivery windows', async () => {
        mockGetAllUseCase.execute.mockResolvedValue(success([mockDeliveryWindow]));
      const response = await request(app).get('/delivery-windows');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([mockDeliveryWindowDto]);
    });
  });

  describe('GET /delivery-windows/:id', () => {
    it('should return a delivery window by id', async () => {
        mockGetByIdUseCase.execute.mockResolvedValue(success(mockDeliveryWindow));
      const response = await request(app).get(`/delivery-windows/${mockDeliveryWindow.id}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(mockDeliveryWindow.id);
    });

    it('should return 404 if not found', async () => {
        mockGetByIdUseCase.execute.mockResolvedValue(failure(HttpError.notFound('Not Found')));
        const response = await request(app).get('/delivery-windows/non-existent-id');
        expect(response.status).toBe(404);
    })
  });

  describe('PUT /delivery-windows/:id', () => {
    it('should update a delivery window', async () => {
        const updatedEntityResult = DeliveryWindow.create({ ...mockDeliveryWindow.props, label: 'Updated Label' }, mockDeliveryWindow.id);
        if (!updatedEntityResult.success) {
            throw updatedEntityResult.error;
        }
        const updatedEntity = updatedEntityResult.value;
        mockUpdateUseCase.execute.mockResolvedValue(success(updatedEntity));
      const response = await request(app)
        .put(`/delivery-windows/${mockDeliveryWindow.id}`)
        .send({ label: 'Updated Label' });

      expect(response.status).toBe(200);
      expect(response.body.label).toBe('Updated Label');
    });

    it('should return 404 if not found', async () => {
        mockUpdateUseCase.execute.mockResolvedValue(failure(HttpError.notFound('Not Found')));
        const response = await request(app)
        .put('/delivery-windows/non-existent-id')
        .send({ label: 'Updated Label' });

        expect(response.status).toBe(404);
    });
  });

  describe('DELETE /delivery-windows/:id', () => {
    it('should delete a delivery window', async () => {
        mockDeleteUseCase.execute.mockResolvedValue(success(undefined));
      const response = await request(app).delete(`/delivery-windows/${mockDeliveryWindow.id}`);

      expect(response.status).toBe(204);
    });

    it('should return 404 if not found', async () => {
        mockDeleteUseCase.execute.mockResolvedValue(failure(HttpError.notFound('Not Found')));
        const response = await request(app).delete('/delivery-windows/non-existent-id');
        expect(response.status).toBe(404);
    });
  });
});
