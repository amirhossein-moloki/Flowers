import { Router } from 'express';
import { AppDependencies } from '@/main';
import { DeliveryWindowController } from './controller';
import { validate } from '@/core/middlewares/validate.middleware';
import { createDeliveryWindowSchema } from './dto/create-delivery-window.schema';
import { updateDeliveryWindowSchema } from './dto/update-delivery-window.schema';
import { CreateDeliveryWindowUseCase } from '../application/use-cases/create-delivery-window.usecase';
import { GetAllDeliveryWindowsUseCase } from '../application/use-cases/get-all-delivery-windows.usecase';
import { GetDeliveryWindowByIdUseCase }from '../application/use-cases/get-delivery-window-by-id.usecase';
import { UpdateDeliveryWindowUseCase } from '../application/use-cases/update-delivery-window.usecase';
import { DeleteDeliveryWindowUseCase } from '../application/use-cases/delete-delivery-window.usecase';


export function createDeliveryWindowRoutes(dependencies: AppDependencies): Router {
  const router = Router();
  const createUseCase = new CreateDeliveryWindowUseCase(dependencies.deliveryWindowRepository);
  const getAllUseCase = new GetAllDeliveryWindowsUseCase(dependencies.deliveryWindowRepository);
  const getByIdUseCase = new GetDeliveryWindowByIdUseCase(dependencies.deliveryWindowRepository);
  const updateUseCase = new UpdateDeliveryWindowUseCase(dependencies.deliveryWindowRepository);
  const deleteUseCase = new DeleteDeliveryWindowUseCase(dependencies.deliveryWindowRepository);
  const controller = new DeliveryWindowController(
    createUseCase,
    getAllUseCase,
    getByIdUseCase,
    updateUseCase,
    deleteUseCase,
  );

  router.post(
    '/',
    validate(createDeliveryWindowSchema),
    controller.create,
  );
  router.get('/', controller.getAll);
  router.get('/:id', controller.getById);
  router.put(
    '/:id',
    validate(updateDeliveryWindowSchema),
    controller.update,
  );
  router.delete('/:id', controller.delete);

  return router;
}