import 'reflect-metadata';
import request from 'supertest';
import express from 'express';
import { mockDeep, mockReset } from 'jest-mock-extended';
import { PrismaClient, DiscountType } from '@prisma/client';

const prismaMock = mockDeep<PrismaClient>();
jest.mock('@/infrastructure/database/prisma/prisma-client', () => ({
  prisma: prismaMock,
}));
jest.mock('@prisma/client', () => {
  const originalModule = jest.requireActual('@prisma/client');
  return {
    ...originalModule,
    DiscountType: {
      PERCENTAGE: 'PERCENTAGE',
      FIXED_AMOUNT: 'FIXED_AMOUNT',
    },
  };
});

import { promotionRouter } from '../promotion.routes';
import { NotFoundError } from '@/core/errors/not-found.error';
import { PromotionController } from '../promotion.controller';
import { CreatePromotionUseCase } from '@/modules/promotion/application/use-cases/create-promotion.usecase';
import { GetPromotionUseCase } from '@/modules/promotion/application/use-cases/get-promotion.usecase';
import { UpdatePromotionUseCase } from '@/modules/promotion/application/use-cases/update-promotion.usecase';
import { DeletePromotionUseCase } from '@/modules/promotion/application/use-cases/delete-promotion.usecase';
import { GetAllPromotionsUseCase } from '@/modules/promotion/application/use-cases/get-all-promotions.usecase';
import { PrismaPromotionRepository } from '@/modules/promotion/infrastructure/prisma-promotion.repository';
import { Router } from 'express';

const app = express();
app.use(express.json());

beforeEach(() => {
  mockReset(prismaMock);
  const promotionRepository = new PrismaPromotionRepository(prismaMock as unknown as PrismaClient);
  const createPromotionUseCase = new CreatePromotionUseCase(promotionRepository);
  const getPromotionUseCase = new GetPromotionUseCase(promotionRepository);
  const updatePromotionUseCase = new UpdatePromotionUseCase(promotionRepository);
  const deletePromotionUseCase = new DeletePromotionUseCase(promotionRepository);
  const getAllPromotionsUseCase = new GetAllPromotionsUseCase(promotionRepository);
  const promotionController = new PromotionController(
    createPromotionUseCase,
    getPromotionUseCase,
    updatePromotionUseCase,
    deletePromotionUseCase,
    getAllPromotionsUseCase,
  );
  const router = Router();
  router.post('/', promotionController.create.bind(promotionController));
  router.get('/', promotionController.findAll.bind(promotionController));
  router.get('/:id', promotionController.findById.bind(promotionController));
  router.put('/:id', promotionController.update.bind(promotionController));
  router.delete('/:id', promotionController.delete.bind(promotionController));
  app.use('/promotions', router);
});

describe('Promotion Controller', () => {
  it('should create a promotion', async () => {
    const promotion = {
      code: 'TEST',
      discount_type: DiscountType.PERCENTAGE,
      discount_value: 10,
      start_date: new Date().toISOString(),
    };

    prismaMock.promotion.findUnique.mockResolvedValue(null);
    prismaMock.promotion.create.mockResolvedValue({
      id: '1',
      uses_count: 0,
      is_active: true,
      description: null,
      end_date: null,
      max_uses: null,
      created_at: new Date(),
      updated_at: new Date(),
      ...promotion,
    });

    const response = await request(app).post('/promotions').send(promotion);

    expect(response.status).toBe(201);
    expect(response.body.code).toBe('TEST');
  });

  it('should get all promotions', async () => {
    prismaMock.promotion.findMany.mockResolvedValue([]);

    const response = await request(app).get('/promotions');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should get a promotion by id', async () => {
    const promotion = {
      id: '1',
      code: 'TEST',
      discount_type: DiscountType.PERCENTAGE,
      discount_value: 10,
      start_date: new Date(),
      uses_count: 0,
      is_active: true,
      description: null,
      end_date: null,
      max_uses: null,
      created_at: new Date(),
      updated_at: new Date(),
    };
    prismaMock.promotion.findUnique.mockResolvedValue(promotion);

    const response = await request(app).get('/promotions/1');

    expect(response.status).toBe(200);
    expect(response.body.code).toBe('TEST');
  });

  it('should return 404 if promotion not found', async () => {
    prismaMock.promotion.findUnique.mockResolvedValue(null);

    const response = await request(app).get('/promotions/1');

    expect(response.status).toBe(404);
  });

  it('should update a promotion', async () => {
    const promotion = {
      id: '1',
      code: 'TEST',
      discount_type: DiscountType.PERCENTAGE,
      discount_value: 10,
      start_date: new Date(),
      uses_count: 0,
      is_active: true,
      description: null,
      end_date: null,
      max_uses: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const updatedPromotion = {
      ...promotion,
      code: 'TEST2',
    };

    prismaMock.promotion.findUnique.mockResolvedValue(promotion);
    prismaMock.promotion.update.mockResolvedValue(updatedPromotion);

    const response = await request(app).put('/promotions/1').send({ code: 'TEST2' });

    expect(response.status).toBe(200);
    expect(response.body.code).toBe('TEST2');
  });

  it('should return 404 if promotion to update is not found', async () => {
    prismaMock.promotion.findUnique.mockResolvedValue(null);
    prismaMock.promotion.update.mockRejectedValue(new NotFoundError('Promotion not found'));

    const response = await request(app).put('/promotions/1').send({ code: 'TEST2' });

    expect(response.status).toBe(404);
  });

  it('should delete a promotion', async () => {
    const promotion = {
      id: '1',
      code: 'TEST',
      discount_type: DiscountType.PERCENTAGE,
      discount_value: 10,
      start_date: new Date(),
      uses_count: 0,
      is_active: true,
      description: null,
      end_date: null,
      max_uses: null,
      created_at: new Date(),
      updated_at: new Date(),
    };
    prismaMock.promotion.findUnique.mockResolvedValue(promotion);
    prismaMock.promotion.delete.mockResolvedValue(promotion);

    const response = await request(app).delete('/promotions/1');

    expect(response.status).toBe(204);
  });

  it('should return 404 if promotion to delete is not found', async () => {
    prismaMock.promotion.findUnique.mockResolvedValue(null);
    prismaMock.promotion.delete.mockRejectedValue(new NotFoundError('Promotion not found'));

    const response = await request(app).delete('/promotions/1');

    expect(response.status).toBe(404);
  });
});
