import { PrismaClient } from '@prisma/client';
import { IProductImageRepository } from '../../domain/product-image.repository';
import { ProductImage } from '../../domain/product-image.entity';
import { ProductImageMapper } from './product-image.mapper';
import { Result, success, failure } from '@/core/utils/result';

export class PrismaProductImageRepository implements IProductImageRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(
    productImage: ProductImage,
  ): Promise<Result<ProductImage, Error>> {
    try {
      const prismaProductImage =
        ProductImageMapper.toPersistence(productImage);
      const newProductImage = await this.prisma.productImage.create({
        data: prismaProductImage,
      });
      return success(ProductImageMapper.toDomain(newProductImage));
    } catch (error) {
      return failure(error as Error);
    }
  }

  async delete(id: string): Promise<Result<boolean, Error>> {
    try {
      await this.prisma.productImage.delete({ where: { id } });
      return success(true);
    } catch (error) {
      return failure(error as Error);
    }
  }

  async findById(id: string): Promise<Result<ProductImage, Error>> {
    try {
      const productImage = await this.prisma.productImage.findUnique({
        where: { id },
      });
      if (!productImage) {
        return failure(new Error('Product image not found'));
      }
      return success(ProductImageMapper.toDomain(productImage));
    } catch (error) {
      return failure(error as Error);
    }
  }

  async findAll(): Promise<Result<ProductImage[], Error>> {
    try {
      const productImages = await this.prisma.productImage.findMany();
      return success(
        productImages.map(ProductImageMapper.toDomain),
      );
    } catch (error) {
      return failure(error as Error);
    }
  }

  async update(
    productImage: ProductImage,
  ): Promise<Result<ProductImage, Error>> {
    try {
      const prismaProductImage =
        ProductImageMapper.toPersistence(productImage);
      const updatedProductImage = await this.prisma.productImage.update({
        where: { id: productImage.id },
        data: prismaProductImage,
      });
      return success(
        ProductImageMapper.toDomain(updatedProductImage),
      );
    } catch (error) {
      return failure(error as Error);
    }
  }
}
