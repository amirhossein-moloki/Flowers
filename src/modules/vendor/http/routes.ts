import { Router } from 'express';
import { VendorController } from './controller';
import { validate } from '@/core/middlewares/validate.middleware';
import { createVendorSchema } from './dto/create-vendor.schema';
import { updateVendorSchema } from './dto/update-vendor.schema';
import { Dependencies } from '@/infrastructure/di';

export const createVendorRoutes = (dependencies: Dependencies) => {
  const router = Router();

  const vendorController = new VendorController(
    dependencies.createVendorUseCase,
    dependencies.getVendorUseCase,
    dependencies.updateVendorUseCase,
    dependencies.deleteVendorUseCase,
    dependencies.listVendorsUseCase,
  );

  router.get('/', vendorController.findAll.bind(vendorController));
  router.get('/:id', vendorController.findById.bind(vendorController));
  router.post('/', validate(createVendorSchema), vendorController.create.bind(vendorController));
  router.put('/:id', validate(updateVendorSchema), vendorController.update.bind(vendorController));
  router.delete('/:id', vendorController.delete.bind(vendorController));

  return router;
};
