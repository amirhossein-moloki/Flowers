import { PrismaProductImageRepository } from '../../product-image/infrastructure/prisma-product-image.repository';
import { ProductImage } from '../../product-image/domain/product-image.entity';
import prisma from '../../../infrastructure/database/prisma/prisma-client';
import { ProductImageMapper } from '../../product-image/infrastructure/product-image.mapper';

jest.mock('../../../infrastructure/database/prisma/prisma-client', () => ({
  productImage: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock('../../product-image/infrastructure/product-image.mapper', () => ({
  ProductImageMapper: {
    toDomain: jest.fn(),
    toPersistence: jest.fn(),
  },
}));

describe('PrismaProductImageRepository', () => {
  let repository: PrismaProductImageRepository;
  let mockPrisma;
  let mockMapper;

  beforeEach(() => {
    repository = new PrismaProductImageRepository();
    mockPrisma = prisma.productImage;
    mockMapper = ProductImageMapper;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return a product image if found', async () => {
      const productImageId = 'some-id';
      const prismaProductImage = { id: productImageId, product_id: 'prod-1', url: 'http://example.com/img.png', sort_order: 1, created_at: new Date(), updated_at: new Date() };
      const domainProductImage = ProductImage.create({ product_id: 'prod-1', url: 'http://example.com/img.png', sort_order: 1 }, productImageId).value;

      mockPrisma.findUnique.mockResolvedValue(prismaProductImage);
      mockMapper.toDomain.mockReturnValue(domainProductImage);

      const result = await repository.findById(productImageId);

      expect(result).toEqual(domainProductImage);
      expect(mockPrisma.findUnique).toHaveBeenCalledWith({ where: { id: productImageId } });
      expect(mockMapper.toDomain).toHaveBeenCalledWith(prismaProductImage);
    });

    it('should return null if product image not found', async () => {
      const productImageId = 'non-existent-id';
      mockPrisma.findUnique.mockResolvedValue(null);

      const result = await repository.findById(productImageId);

      expect(result).toBeNull();
      expect(mockPrisma.findUnique).toHaveBeenCalledWith({ where: { id: productImageId } });
    });
  });

  describe('findAll', () => {
    it('should return all product images', async () => {
      const prismaProductImages = [
        { id: '1', product_id: 'prod-1', url: 'http://example.com/img1.png', sort_order: 1, created_at: new Date(), updated_at: new Date() },
        { id: '2', product_id: 'prod-1', url: 'http://example.com/img2.png', sort_order: 2, created_at: new Date(), updated_at: new Date() },
      ];
      const domainProductImages = prismaProductImages.map(pi => ProductImage.create({ product_id: pi.product_id, url: pi.url, sort_order: pi.sort_order }, pi.id).value);

      mockPrisma.findMany.mockResolvedValue(prismaProductImages);
      mockMapper.toDomain.mockImplementation(pi => domainProductImages.find(dpi => dpi.id === pi.id));

      const result = await repository.findAll();

      expect(result).toEqual(domainProductImages);
      expect(mockPrisma.findMany).toHaveBeenCalled();
      expect(mockMapper.toDomain).toHaveBeenCalledTimes(2);
    });
  });

  describe('save', () => {
    it('should upsert a product image', async () => {
      const productImage = ProductImage.create({ product_id: 'prod-1', url: 'http://example.com/img.png', sort_order: 1 }, 'some-id').value;
      const persistenceProductImage = { id: 'some-id', product_id: 'prod-1', url: 'http://example.com/img.png', sort_order: 1, created_at: new Date(), updated_at: new Date() };

      mockMapper.toPersistence.mockReturnValue(persistenceProductImage);

      await repository.save(productImage);

      expect(mockMapper.toPersistence).toHaveBeenCalledWith(productImage);
      expect(mockPrisma.upsert).toHaveBeenCalledWith({
        where: { id: productImage.id },
        update: persistenceProductImage,
        create: persistenceProductImage,
      });
    });
  });

  describe('delete', () => {
    it('should delete a product image', async () => {
      const productImageId = 'some-id';
      await repository.delete(productImageId);
      expect(mockPrisma.delete).toHaveBeenCalledWith({ where: { id: productImageId } });
    });
  });
});