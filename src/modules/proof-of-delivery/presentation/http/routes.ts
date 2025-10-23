import { Router } from 'express';
import { ProofOfDeliveryController } from './controller';
import { validate } from '../../../../core/middlewares/validate.middleware';
import { createProofOfDeliverySchema } from './dto/create-proof-of-delivery.schema';
import { updateProofOfDeliverySchema } from './dto/update-proof-of-delivery.schema';
import { Dependencies } from '@/infrastructure/di';
import { isAuthenticated, hasRole } from '@/core/middlewares/auth.middleware';
import { UserRole } from '@prisma/client';

export function createProofOfDeliveryRoutes(dependencies: Dependencies): Router {
  const router = Router();
  const controller = new ProofOfDeliveryController(
    dependencies.createProofOfDeliveryUseCase,
    dependencies.findProofOfDeliveryByIdUseCase,
    dependencies.updateProofOfDeliveryUseCase,
    dependencies.deleteProofOfDeliveryUseCase
  );

  router.use(isAuthenticated);

  router.post(
    '/',
    hasRole([UserRole.ADMIN, UserRole.DRIVER]),
    validate(createProofOfDeliverySchema),
    controller.create.bind(controller)
  );
  router.get('/:id', controller.findById.bind(controller));
  router.put(
    '/:id',
    hasRole([UserRole.ADMIN, UserRole.DRIVER]),
    validate(updateProofOfDeliverySchema),
    controller.update.bind(controller)
  );
  router.delete(
    '/:id',
    hasRole([UserRole.ADMIN, UserRole.DRIVER]),
    controller.delete.bind(controller)
  );

  return router;
}
