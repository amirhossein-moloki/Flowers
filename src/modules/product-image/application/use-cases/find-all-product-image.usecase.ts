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
    const productImages = await this.productImageRepository.findAllByProductId(
      productId,
    );
    const productImagesDto = productImages.map(productImage =>
      ProductImageMapper.toDto(productImage),
    );
    return success(productImagesDto);
  }
}
