import { PrismaClient } from '@prisma/client';
import { ProductImage } from '../domain/product-image.entity';
import { IProductImageRepository } from '../domain/product-image.repository.interface';
import { ProductImageMapper } from './product-image.mapper';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/http/http-error';

export class PrismaProductImageRepository implements IProductImageRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(productImage: ProductImage): Promise<Result<ProductImage, HttpError>> {
    try {
      const data = ProductImageMapper.toModel(productImage);
      const prismaProductImage = await this.prisma.productImage.create({ data });
      const newProductImageEntity = ProductImageMapper.toEntity(prismaProductImage);
      return success(newProductImageEntity);
    } catch (error: any) {
      return failure(HttpError.internalServerError(error.message));
    }
  }

  async findAll(): Promise<Result<ProductImage[], HttpError>> {
    try {
      const results = await this.prisma.productImage.findMany();
      return success(results.map(ProductImageMapper.toEntity));
    } catch (error: any) {
      return failure(HttpError.internalServerError(error.message));
    }
  }

  async update(productImage: ProductImage): Promise<Result<ProductImage, HttpError>> {
    try {
      const data = ProductImageMapper.toModel(productImage);
      const prismaProductImage = await this.prisma.productImage.update({
        where: { id: productImage.id },
        data,
      });
      const updatedProductImageEntity = ProductImageMapper.toEntity(prismaProductImage);
      return success(updatedProductImageEntity);
    } catch (error: any) {
      return failure(HttpError.internalServerError(error.message));
    }
  }

  async findById(id: string): Promise<Result<ProductImage | null, HttpError>> {
    try {
      const result = await this.prisma.productImage.findUnique({
        where: { id },
      });
      return success(result ? ProductImageMapper.toEntity(result) : null);
    } catch (error: any) {
      return failure(HttpError.internalServerError(error.message));
    }
  }

  async findAllByProductId(productId: string): Promise<Result<ProductImage[], HttpError>> {
    try {
      const results = await this.prisma.productImage.findMany({
        where: { product_id: productId },
      });
      return success(results.map(ProductImageMapper.toEntity));
    } catch (error: any) {
      return failure(HttpError.internalServerError(error.message));
    }
  }

  async delete(id: string): Promise<Result<null, HttpError>> {
    try {
      await this.prisma.productImage.delete({ where: { id } });
      return success(null);
    } catch (error: any) {
      return failure(HttpError.internalServerError(error.message));
    }
  }
}
