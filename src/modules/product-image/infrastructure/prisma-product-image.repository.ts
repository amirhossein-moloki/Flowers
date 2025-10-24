import { PrismaClient } from '@prisma/client';
import { ProductImage } from '../domain/product-image.entity';
import { IProductImageRepository } from '../domain/product-image.repository.interface';
import { ProductImageMapper } from './product-image.mapper';
import { Result, success, failure } from '@/core/utils/result';
import { NotFoundError } from '@/core/errors/not-found.error';

export class PrismaProductImageRepository implements IProductImageRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(productImage: ProductImage): Promise<Result<ProductImage, Error>> {
    const data = ProductImageMapper.toModel(productImage);
    const result = await this.prisma.productImage.create({ data });
    return success(ProductImageMapper.toEntity(result));
  }

  async findById(id: string): Promise<Result<ProductImage, Error>> {
    const result = await this.prisma.productImage.findUnique({
      where: { id },
    });
    if (!result) {
      return failure(new NotFoundError('Product image not found'));
    }
    return success(ProductImageMapper.toEntity(result));
  }

  async findAll(): Promise<Result<ProductImage[], Error>> {
    const results = await this.prisma.productImage.findMany();
    return success(results.map(ProductImageMapper.toEntity));
  }

  async update(productImage: ProductImage): Promise<Result<ProductImage, Error>> {
    const data = ProductImageMapper.toModel(productImage);
    const result = await this.prisma.productImage.update({
      where: { id: productImage.id },
      data,
    });
    return success(ProductImageMapper.toEntity(result));
  }

  async delete(id: string): Promise<Result<boolean, Error>> {
    await this.prisma.productImage.delete({ where: { id } });
    return success(true);
  }
}
