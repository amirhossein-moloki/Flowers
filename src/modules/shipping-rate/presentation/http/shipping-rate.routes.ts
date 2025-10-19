import { Router } from 'express';
import { ShippingRateController } from './shipping-rate.controller';
import { validate } from '@/core/middlewares/validate.middleware';
import { createShippingRateSchema } from './dto/create-shipping-rate.schema';
import { updateShippingRateSchema } from './dto/update-shipping-rate.schema';
import { calculateShippingRateSchema } from './dto/calculate-shipping-rate.schema';
import { Dependencies } from '@/infrastructure/di';

export function createShippingRateRoutes(dependencies: Dependencies): Router {
  const router = Router();

  const controller = new ShippingRateController(
    dependencies.createShippingRateUseCase,
    dependencies.updateShippingRateUseCase,
    dependencies.deleteShippingRateUseCase,
    dependencies.getShippingRateUseCase,
    dependencies.listShippingRatesUseCase,
    dependencies.calculateShippingRateUseCase,
  );

  router.post('/', validate(createShippingRateSchema), controller.create.bind(controller));
  router.put('/:id', validate(updateShippingRateSchema), controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));
  router.get('/:id', controller.findById.bind(controller));
  router.get('/', controller.findAll.bind(controller));
  router.post('/calculate', validate(calculateShippingRateSchema), controller.calculate.bind(controller));

  return router;
}
