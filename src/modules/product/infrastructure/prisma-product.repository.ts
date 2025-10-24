import { IProductRepository } from '@/modules/product/domain/product.repository';
import { Product } from '@/modules/product/domain/product.entity';
import { PrismaClient } from '@prisma/client';
import { ProductMapper } from '@/modules/product/infrastructure/product.mapper';

export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    return product ? ProductMapper.toDomain(product) : null;
  }

  async findAll(options: {
    page: number;
    limit: number;
    vendorId?: string;
  }): Promise<Product[]> {
    const { page, limit, vendorId } = options;
    const products = await this.prisma.product.findMany({
      where: { vendorId },
      skip: (page - 1) * limit,
      take: limit,
    });
    return products.map(ProductMapper.toDomain);
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await this.prisma.product.findFirst({ where: { name } });
    return product ? ProductMapper.toDomain(product) : null;
  }

  async save(product: Product): Promise<void> {
    const data = ProductMapper.toPersistence(product);
    await this.prisma.product.upsert({
      where: { id: product.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
