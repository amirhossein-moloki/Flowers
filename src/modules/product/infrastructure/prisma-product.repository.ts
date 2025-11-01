import { IProductRepository } from '@/modules/product/domain/product.repository';
import { Product } from '@/modules/product/domain/product.entity';
import { Prisma, PrismaClient } from '@prisma/client';
import { ProductMapper } from '@/modules/product/infrastructure/product.mapper';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Result<Product, HttpError>> {
    try {
      const product = await this.prisma.product.findUnique({ where: { id } });
      if (!product) {
        return failure(HttpError.notFound('Product not found'));
      }
      return success(ProductMapper.toDomain(product));
    } catch (error) {
      return failure(HttpError.internalServerError());
    }
  }

  async findAll(options: {
    page: number;
    limit: number;
    vendorId?: string;
  }): Promise<Result<Product[], HttpError>> {
    const { page, limit, vendorId } = options;
    try {
      const products = await this.prisma.product.findMany({
        where: { vendorId },
        skip: (page - 1) * limit,
        take: limit,
      });
      return success(products.map(ProductMapper.toDomain));
    } catch (error) {
      return failure(HttpError.internalServerError());
    }
  }

  async findByName(name: string): Promise<Result<Product, HttpError>> {
    try {
      const product = await this.prisma.product.findFirst({ where: { name } });
      if (!product) {
        return failure(HttpError.notFound('Product not found'));
      }
      return success(ProductMapper.toDomain(product));
    } catch (error) {
      return failure(HttpError.internalServerError());
    }
  }

  async save(product: Product): Promise<Result<Product, HttpError>> {
    const data = ProductMapper.toPersistence(product);
    try {
      const newProduct = await this.prisma.product.upsert({
        where: { id: product.id },
        update: data,
        create: data,
      });
      return success(ProductMapper.toDomain(newProduct));
    } catch (error) {
      return failure(HttpError.internalServerError());
    }
  }

  async delete(id: string): Promise<Result<boolean, HttpError>> {
    try {
      await this.prisma.product.delete({ where: { id } });
      return success(true);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return failure(HttpError.notFound('Product to delete not found'));
      }
      return failure(HttpError.internalServerError());
    }
  }
}