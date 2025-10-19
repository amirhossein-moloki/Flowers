import { Router } from 'express';
import { PromotionController } from './promotion.controller';
import { validate } from '@/core/middlewares/validate.middleware';
import { createPromotionSchema } from './dto/create-promotion.schema';
import { updatePromotionSchema } from './dto/update-promotion.schema';
import { CreatePromotionUseCase } from '@/modules/promotion/application/use-cases/create-promotion.usecase';
import { GetPromotionUseCase } from '@/modules/promotion/application/use-cases/get-promotion.usecase';
import { UpdatePromotionUseCase } from '@/modules/promotion/application/use-cases/update-promotion.usecase';
import { DeletePromotionUseCase } from '@/modules/promotion/application/use-cases/delete-promotion.usecase';
import { GetAllPromotionsUseCase } from '@/modules/promotion/application/use-cases/get-all-promotions.usecase';
import { PrismaPromotionRepository } from '@/modules/promotion/infrastructure/prisma-promotion.repository';
import { prisma } from '@/infrastructure/database/prisma/prisma-client';

export const promotionRouter = Router();

const promotionRepository = new PrismaPromotionRepository(prisma);

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

promotionRouter.post(
  '/',
  validate(createPromotionSchema),
  promotionController.create.bind(promotionController),
);
promotionRouter.get('/', promotionController.findAll.bind(promotionController));
promotionRouter.get('/:id', promotionController.findById.bind(promotionController));
promotionRouter.put(
  '/:id',
  validate(updatePromotionSchema),
  promotionController.update.bind(promotionController),
);
promotionRouter.delete('/:id', promotionController.delete.bind(promotionController));
