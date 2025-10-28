import { IProductImageRepository } from '../../domain/product-image.repository.interface';
import { Result, success } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { ProductImageDto } from '../dtos/product-image.dto';
import { ProductImageMapper } from '../../infrastructure/product-image.mapper';

export class FindAllProductImageUseCase {
  constructor(private readonly productImageRepository: IProductImageRepository) {}

  async execute(
    productId: string,
  ): Promise<Result<ProductImage[], HttpError>> {
    const productImagesResult =
      await this.productImageRepository.findAllByProductId(productId);

    if (!productImagesResult.success) {
      return productImagesResult;
    }

    return success(productImagesResult.value);
  }
}
