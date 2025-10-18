import { IProductImageRepository } from '../domain/product-image.repository';
import { ProductImage } from '../domain/product-image.entity';
import prisma from '../../../infrastructure/database/prisma/prisma-client';
import { ProductImageMapper } from './product-image.mapper';

export class PrismaProductImageRepository implements IProductImageRepository {
  async findById(id: string): Promise<ProductImage | null> {
    const productImage = await prisma.productImage.findUnique({ where: { id } });
    return productImage ? ProductImageMapper.toDomain(productImage) : null;
  }

  async findAll(): Promise<ProductImage[]> {
    const productImages = await prisma.productImage.findMany();
    return productImages.map(ProductImageMapper.toDomain);
  }

  async save(productImage: ProductImage): Promise<void> {
    const data = ProductImageMapper.toPersistence(productImage);
    await prisma.productImage.upsert({
      where: { id: productImage.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.productImage.delete({ where: { id } });
  }
}