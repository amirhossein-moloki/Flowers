import { PrismaClient } from '@prisma/client';
import { ProductImage } from '../domain/product-image.entity';
import { IProductImageRepository } from '../domain/product-image.repository.interface';
import { ProductImageMapper } from './product-image.mapper';

export class PrismaProductImageRepository implements IProductImageRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(productImage: ProductImage): Promise<void> {
    const data = ProductImageMapper.toModel(productImage);
    await this.prisma.productImage.upsert({
      where: { id: productImage.id },
      update: data,
      create: data,
    });
  }

  async findById(id: string): Promise<ProductImage | null> {
    const result = await this.prisma.productImage.findUnique({
      where: { id },
    });
    return result ? ProductImageMapper.toEntity(result) : null;
  }

  async findAllByProductId(productId: string): Promise<ProductImage[]> {
    const results = await this.prisma.productImage.findMany({
      where: { product_id: productId },
    });
    return results.map(ProductImageMapper.toEntity);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.productImage.delete({ where: { id } });
  }
}
