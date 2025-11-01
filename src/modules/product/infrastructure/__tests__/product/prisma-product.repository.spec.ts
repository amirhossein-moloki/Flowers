import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaProductRepository } from '@/modules/product/infrastructure/prisma-product.repository';
import { Product } from '@/modules/product/domain/product.entity';
import { ProductMapper } from '@/modules/product/infrastructure/product.mapper';
import { IProductProps } from '@/modules/product/domain/product.entity';
import { Result } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

describe('PrismaProductRepository', () => {
  let repository: PrismaProductRepository;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(() => {
    prismaMock = mockDeep<PrismaClient>();
    repository = new PrismaProductRepository(prismaMock);
  });

  const productProps: IProductProps = {
    name: 'Test Product',
    description: 'This is a test product.',
    price: 99.99,
    stock: 100,
    vendorId: 'vendor-id-1',
  };

  const productEntity = Product.create(productProps, 'prod-id-1').value as Product;

  it('findById should return a product entity when found', async () => {
    prismaMock.product.findUnique.mockResolvedValue(ProductMapper.toPersistence(productEntity));
    const result = await repository.findById('prod-id-1');

    expect(result.isSuccess()).toBe(true);
    const foundProduct = result.value as Product;
    expect(foundProduct).toBeInstanceOf(Product);
    expect(foundProduct.id).toBe('prod-id-1');
    expect(prismaMock.product.findUnique).toHaveBeenCalledWith({ where: { id: 'prod-id-1' } });
  });

  it('findAll should return a paginated list of products', async () => {
    prismaMock.product.findMany.mockResolvedValue([ProductMapper.toPersistence(productEntity)]);
    const result = await repository.findAll({ page: 1, limit: 10, vendorId: 'vendor-id-1' });

    expect(result.isSuccess()).toBe(true);
    const products = result.value as Product[];
    expect(products).toHaveLength(1);
    expect(products[0]).toBeInstanceOf(Product);
    expect(prismaMock.product.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
      where: { vendorId: 'vendor-id-1' },
    });
  });

  it('findByName should return a product entity when found', async () => {
    prismaMock.product.findFirst.mockResolvedValue(ProductMapper.toPersistence(productEntity));
    const result = await repository.findByName('Test Product');

    expect(result.isSuccess()).toBe(true);
    const foundProduct = result.value as Product;
    expect(foundProduct).toBeInstanceOf(Product);
    expect(foundProduct.name).toBe('Test Product');
    expect(prismaMock.product.findFirst).toHaveBeenCalledWith({ where: { name: 'Test Product' } });
  });

  it('save should create or update a product', async () => {
    prismaMock.product.upsert.mockResolvedValue(ProductMapper.toPersistence(productEntity));
    const result = await repository.save(productEntity);

    expect(result.isSuccess()).toBe(true);
    const savedProduct = result.value as Product;
    expect(savedProduct).toBeInstanceOf(Product);
    expect(prismaMock.product.upsert).toHaveBeenCalledWith({
      where: { id: productEntity.id },
      create: ProductMapper.toPersistence(productEntity),
      update: ProductMapper.toPersistence(productEntity),
    });
  });

  it('delete should remove a product', async () => {
    prismaMock.product.delete.mockResolvedValue(ProductMapper.toPersistence(productEntity));
    const result = await repository.delete('prod-id-1');

    expect(result.isSuccess()).toBe(true);
    expect(result.value).toBe(true);
    expect(prismaMock.product.delete).toHaveBeenCalledWith({ where: { id: 'prod-id-1' } });
  });
});