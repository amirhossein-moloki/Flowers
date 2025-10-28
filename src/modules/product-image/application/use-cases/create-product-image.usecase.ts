import { IProductImageRepository } from '../../domain/product-image.repository.interface';
import { ProductImage, ProductImageProps } from '../../domain/product-image.entity';
import { CreateProductImageDto } from '../dtos/create-product-image.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { ProductImageDto } from '../dtos/product-image.dto';
import { ProductImageMapper } from '../../infrastructure/product-image.mapper';

export class CreateProductImageUseCase {
  constructor(private readonly productImageRepository: IProductImageRepository) {}

  async execute(
    dto: CreateProductImageDto,
  ): Promise<Result<ProductImage, HttpError>> {
    const productImageProps: ProductImageProps = {
      productId: dto.productId,
      url: dto.url,
      sort_order: dto.sort_order,
    };

    const productImageResult = ProductImage.create(productImageProps);

    if (!productImageResult.success) {
      return failure(HttpError.internalServerError(productImageResult.error.message));
    }

    const productImage = productImageResult.value;

    await this.productImageRepository.create(productImage);

    return success(productImage);
  }
}
