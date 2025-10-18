import { IProductRepository } from '@/modules/product/domain/product.repository';
import { Product } from '@/modules/product/domain/product.entity';
import prisma from '@/infrastructure/database/prisma/prisma-client';
import { ProductMapper } from '@/modules/product/infrastructure/product.mapper';

export class PrismaProductRepository implements IProductRepository {
  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({ where: { id } });
    return product ? ProductMapper.toDomain(product) : null;
  }

  async findAll(page: number, pageSize: number): Promise<Product[]> {
    const products = await prisma.product.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return products.map(ProductMapper.toDomain);
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({ where: { name } });
    return product ? ProductMapper.toDomain(product) : null;
  }

  async save(product: Product): Promise<void> {
    const data = ProductMapper.toPersistence(product);
    await prisma.product.upsert({
      where: { id: product.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }
}