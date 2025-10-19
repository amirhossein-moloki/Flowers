import { Router } from 'express';
import { ProductImageController } from './product-image.controller';
import { validate } from '@/core/middlewares/validate.middleware';
import { CreateProductImageSchema } from './dto/create-product-image.schema';
import { UpdateProductImageSchema } from './dto/update-product-image.schema';
import { PrismaProductImageRepository } from '../../infrastructure/prisma-product-image.repository';
import { CreateProductImageUseCase } from '../../application/use-cases/create-product-image.usecase';
import { DeleteProductImageUseCase } from '../../application/use-cases/delete-product-image.usecase';
import { GetProductImageUseCase } from '../../application/use-cases/get-product-image.usecase';
import { UpdateProductImageUseCase } from '../../application/use-cases/update-product-image.usecase';
import { FindAllProductImageUseCase } from '../../application/use-cases/find-all-product-image.usecase';
import prisma from '@/infrastructure/database/prisma/prisma-client';

const router = Router();

// Dependencies
const productImageRepository = new PrismaProductImageRepository(prisma);
const createProductImageUseCase = new CreateProductImageUseCase(
  productImageRepository,
);
const deleteProductImageUseCase = new DeleteProductImageUseCase(
  productImageRepository,
);
const getProductImageUseCase = new GetProductImageUseCase(productImageRepository);
const updateProductImageUseCase = new UpdateProductImageUseCase(
  productImageRepository,
);
const findAllProductImageUseCase = new FindAllProductImageUseCase(
  productImageRepository,
);
const productImageController = new ProductImageController(
  createProductImageUseCase,
  deleteProductImageUseCase,
  getProductImageUseCase,
  updateProductImageUseCase,
  findAllProductImageUseCase,
);

router.post(
  '/',
  validate(CreateProductImageSchema),
  productImageController.create.bind(productImageController),
);
router.delete(
  '/:id',
  productImageController.delete.bind(productImageController),
);
router.get(
  '/:id',
  productImageController.findById.bind(productImageController),
);
router.get('/', productImageController.findAll.bind(productImageController));
router.put(
  '/:id',
  validate(UpdateProductImageSchema),
  productImageController.update.bind(productImageController),
);

export default router;
