import { Router } from 'express';
import { PromotionController } from './promotion.controller';
import { validate } from '@/core/middlewares/validate.middleware';
import { createPromotionSchema } from './dto/create-promotion.schema';
import { updatePromotionSchema } from './dto/update-promotion.schema';
import { Dependencies } from '@/infrastructure/di';

export const createPromotionRoutes = (dependencies: Dependencies): Router => {
  const router = Router();

  const promotionController = new PromotionController(
    dependencies.createPromotionUseCase,
    dependencies.getPromotionUseCase,
    dependencies.updatePromotionUseCase,
    dependencies.deletePromotionUseCase,
    dependencies.getAllPromotionsUseCase,
  );

  router.post(
    '/',
    validate(createPromotionSchema),
    promotionController.create.bind(promotionController),
  );
  router.get('/', promotionController.findAll.bind(promotionController));
  router.get('/:id', promotionController.findById.bind(promotionController));
  router.put(
    '/:id',
    validate(updatePromotionSchema),
    promotionController.update.bind(promotionController),
  );
  router.delete('/:id', promotionController.delete.bind(promotionController));

  return router;
};
