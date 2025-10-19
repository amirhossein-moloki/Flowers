import { Router } from 'express';
import { VendorController } from './controller';
import { validate } from '@/core/middlewares/validate.middleware';
import { createVendorSchema } from './dto/create-vendor.schema';
import { updateVendorSchema } from './dto/update-vendor.schema';
import { CreateVendorUseCase } from '../application/use-cases/create-vendor.usecase';
import { GetVendorUseCase } from '../application/use-cases/get-vendor.usecase';
import { UpdateVendorUseCase } from '../application/use-cases/update-vendor.usecase';
import { DeleteVendorUseCase } from '../application/use-cases/delete-vendor.usecase';
import { ListVendorsUseCase } from '../application/use-cases/list-vendors.usecase';
import { PrismaVendorRepository } from '../infrastructure/prisma-vendor.repository';
import { AppDependencies } from '@/app';

export const createVendorRoutes = (dependencies: AppDependencies) => {
  const router = Router();
  const vendorRepository = new PrismaVendorRepository(dependencies.prisma);
  const createVendorUseCase = new CreateVendorUseCase(vendorRepository);
  const getVendorUseCase = new GetVendorUseCase(vendorRepository);
  const updateVendorUseCase = new UpdateVendorUseCase(vendorRepository);
  const deleteVendorUseCase = new DeleteVendorUseCase(vendorRepository);
  const listVendorsUseCase = new ListVendorsUseCase(vendorRepository);

  const vendorController = new VendorController({
    createVendorUseCase,
    getVendorUseCase,
    updateVendorUseCase,
    deleteVendorUseCase,
    listVendorsUseCase,
  });

  router.get('/', vendorController.findAll.bind(vendorController));
  router.get('/:id', vendorController.findById.bind(vendorController));
  router.post('/', validate(createVendorSchema), vendorController.create.bind(vendorController));
  router.put('/:id', validate(updateVendorSchema), vendorController.update.bind(vendorController));
  router.delete('/:id', vendorController.delete.bind(vendorController));

  return router;
};
