import { PrismaProductRepository } from '../prisma-product.repository';
import { Product } from '../../domain/product.entity';
import { prismaMock } from '../../../../modules/__tests__/helpers/prisma-mock.helper';
import { Product as PrismaProduct } from '@prisma/client';

jest.mock('../../../../infrastructure/database/prisma/prisma-client');

describe('PrismaProductRepository', () => {
  let repository: PrismaProductRepository;
  const productProps = { name: 'Test Product', description: 'A test product', price: 100, stock: 10 };
  const productEntityResult = Product.create(productProps, 'some-uuid');
  const productEntity = productEntityResult.success ? productEntityResult.value : null;

  const prismaProduct: PrismaProduct = {
    id: productEntity!.id,
    ...productProps,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    repository = new PrismaProductRepository(prismaMock);
  });

  describe('save', () => {
    it('should call prisma.product.upsert with correct data', async () => {
      await repository.save(productEntity!);

      expect(prismaMock.product.upsert).toHaveBeenCalledWith({
        where: { id: productEntity!.id },
        create: {
          id: productEntity!.id,
          name: productEntity!.name,
          description: productEntity!.description,
          price: productEntity!.price,
          stock: productEntity!.stock,
        },
        update: {
          id: productEntity!.id,
          name: productEntity!.name,
          description: productEntity!.description,
          price: productEntity!.price,
          stock: productEntity!.stock,
        },
      });
    });
  });

  describe('findById', () => {
    it('should return a product entity if found', async () => {
      prismaMock.product.findUnique.mockResolvedValue(prismaProduct);

      const result = await repository.findById('some-uuid');

      expect(result).toBeInstanceOf(Product);
      expect(result!.id).toBe(prismaProduct.id);
    });

    it('should return null if product not found', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);

      const result = await repository.findById('non-existent-uuid');

      expect(result).toBeNull();
    });
  });
});