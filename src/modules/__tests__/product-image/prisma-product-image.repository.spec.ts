import { prismaMock } from '../helpers/prisma-mock.helper';
import { PrismaProductImageRepository } from '@/modules/product-image/infrastructure/prisma-product-image.repository';
import { ProductImage } from '@/modules/product-image/domain/product-image.entity';

describe('PrismaProductImageRepository', () => {
  let repository: PrismaProductImageRepository;

  beforeEach(() => {
    repository = new PrismaProductImageRepository(prismaMock);
  });

  const productImageProps = {
    product_id: 'a7e5a2a2-2b6b-4b2b-8a8a-8a8a8a8a8a8a',
    url: 'http://example.com/image.png',
  };
  const productImageResult = ProductImage.create(productImageProps, 'image-id-1');
  if (!productImageResult.success) {
    throw new Error('Test setup failed: could not create product image entity');
  }
  const productImageEntity = productImageResult.value;

  const prismaProductImage = {
    id: productImageEntity.id,
    ...productImageProps,
    sort_order: 0,
    created_at: new Date(),
    updated_at: new Date(),
  };

  test('create should call create on prisma client', async () => {
    prismaMock.productImage.create.mockResolvedValue(prismaProductImage);

    const result = await repository.create(productImageEntity);

    expect(result.success).toBe(true);
    expect(prismaMock.productImage.create).toHaveBeenCalledWith({
      data: {
        ...prismaProductImage,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      },
    });
  });

  test('findById should return a product image entity when found', async () => {
    prismaMock.productImage.findUnique.mockResolvedValue(prismaProductImage);

    const foundProductImage = await repository.findById('image-id-1');

    expect(foundProductImage.success).toBe(true);
    if (foundProductImage.success) {
      expect(foundProductImage.value).toBeInstanceOf(ProductImage);
      expect(foundProductImage.value.id).toBe('image-id-1');
    }
  });

  test('findAll should return a list of product image entities', async () => {
    prismaMock.productImage.findMany.mockResolvedValue([prismaProductImage]);

    const productImages = await repository.findAll();

    expect(productImages.success).toBe(true);
    if (productImages.success) {
      expect(productImages.value).toHaveLength(1);
      expect(productImages.value[0].id).toBe('image-id-1');
    }
  });

  test('update should call update on prisma client', async () => {
    prismaMock.productImage.update.mockResolvedValue(prismaProductImage);

    const result = await repository.update(productImageEntity);

    expect(result.success).toBe(true);
    expect(prismaMock.productImage.update).toHaveBeenCalledWith({
      where: { id: productImageEntity.id },
      data: {
        ...prismaProductImage,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      },
    });
  });

  test('delete should call delete on prisma client', async () => {
    await repository.delete('image-id-1');

    expect(prismaMock.productImage.delete).toHaveBeenCalledWith({
      where: { id: 'image-id-1' },
    });
  });
});
