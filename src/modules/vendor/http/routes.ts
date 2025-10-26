import { Router } from 'express';
import { VendorController } from './controller';
import { validate } from '@/core/middlewares/validate.middleware';
import { createVendorSchema } from './dto/create-vendor.schema';
import { updateVendorSchema } from './dto/update-vendor.schema';
import { Dependencies } from '@/infrastructure/di';
import { isAuthenticated } from '@/core/middlewares/auth.middleware';
import { hasRole } from '@/core/middlewares/auth.middleware';
import { UserRole } from '@/core/domain/enums';

export const createVendorRoutes = (dependencies: Dependencies) => {
  const router = Router();

  const vendorController = new VendorController(
    dependencies.createVendorUseCase,
    dependencies.getVendorUseCase,
    dependencies.updateVendorUseCase,
    dependencies.deleteVendorUseCase,
    dependencies.listVendorsUseCase,
  );

  router.get('/', isAuthenticated, vendorController.findAll.bind(vendorController));
  router.get('/:id', isAuthenticated, vendorController.findById.bind(vendorController));
  router.post(
    '/',
    isAuthenticated,
    hasRole([UserRole.ADMIN]),
    validate(createVendorSchema),
    vendorController.create.bind(vendorController),
  );
  router.put(
    '/:id',
    isAuthenticated,
    hasRole([UserRole.ADMIN]),
    validate(updateVendorSchema),
    vendorController.update.bind(vendorController),
  );
  router.delete('/:id', isAuthenticated, hasRole([UserRole.ADMIN]), vendorController.delete.bind(vendorController));

  return router;
};
