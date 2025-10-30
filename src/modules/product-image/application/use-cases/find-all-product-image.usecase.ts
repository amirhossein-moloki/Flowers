import { IProductImageRepository } from '../../domain/product-image.repository.interface';
import { Result, success } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { ProductImageDto } from '../dtos/product-image.dto';
import { ProductImageMapper } from '../../infrastructure/product-image.mapper';

export class FindAllProductImageUseCase {
  constructor(private readonly productImageRepository: IProductImageRepository) {}

  async execute(
    productId: string,
  ): Promise<Result<ProductImageDto[], HttpError>> {
    const result = await this.productImageRepository.findAllByProductId(
      productId,
    );

    if (result.success) {
      if (!result.value) {
        return success([]);
      }
      const productImagesDto = result.value.map(productImage =>
        ProductImageMapper.toDto(productImage),
      );
      return success(productImagesDto);
    } else {
      return result;
    }
  }
}
