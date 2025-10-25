import { prismaMock } from '@/modules/__tests__/helpers/prisma-mock.helper';
import { PrismaProductRepository } from '@/modules/product/infrastructure/prisma-product.repository';
import { Product } from '@/modules/product/domain/product.entity';
import { ProductMapper } from '@/modules/product/infrastructure/product.mapper';

describe('PrismaProductRepository', () => {
  let repository: PrismaProductRepository;

  beforeEach(() => {
    repository = new PrismaProductRepository(prismaMock);
  });

  const productProps = {
    name: 'Test Product',
    description: 'This is a test product.',
    price: 99.99,
    stock: 100,
  };
  const productResult = Product.create(productProps, 'prod-id-1');
  if (!productResult.success) {
    throw new Error('Test setup failed: could not create product entity');
  }
  const productEntity = productResult.value;

  const prismaProduct = {
    id: productEntity.id,
    ...productProps,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test('findById should return a product entity when found', async () => {
    prismaMock.product.findUnique.mockResolvedValue(prismaProduct);

    const foundProduct = await repository.findById('prod-id-1');

    expect(foundProduct).toBeInstanceOf(Product);
    expect(foundProduct?.id).toBe('prod-id-1');
    expect(prismaMock.product.findUnique).toHaveBeenCalledWith({ where: { id: 'prod-id-1' } });
  });

  test('findAll should return a paginated list of products', async () => {
    prismaMock.product.findMany.mockResolvedValue([prismaProduct]);

    const products = await repository.findAll({ page: 1, limit: 10 });

    expect(products).toHaveLength(1);
    expect(products[0]).toBeInstanceOf(Product);
    expect(prismaMock.product.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
      where: { vendorId: undefined },
    });
  });

  test('findByName should return a product entity when found', async () => {
    prismaMock.product.findFirst.mockResolvedValue(prismaProduct);

    const foundProduct = await repository.findByName('Test Product');

    expect(foundProduct).toBeInstanceOf(Product);
    expect(foundProduct?.name).toBe('Test Product');
    expect(prismaMock.product.findFirst).toHaveBeenCalledWith({ where: { name: 'Test Product' } });
  });

  test('save should call upsert on prisma client', async () => {
    await repository.save(productEntity);

    expect(prismaMock.product.upsert).toHaveBeenCalledWith({
      where: { id: productEntity.id },
      create: ProductMapper.toPersistence(productEntity),
      update: ProductMapper.toPersistence(productEntity),
    });
  });

  test('delete should call delete on prisma client', async () => {
    await repository.delete('prod-id-1');

    expect(prismaMock.product.delete).toHaveBeenCalledWith({
      where: { id: 'prod-id-1' },
    });
  });
});