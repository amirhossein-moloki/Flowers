import { IProductImageRepository } from '../../domain/product-image.repository.interface';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { ProductImageDto } from '../dtos/product-image.dto';
import { ProductImageMapper } from '../../infrastructure/product-image.mapper';

export class GetProductImageUseCase {
  constructor(private readonly productImageRepository: IProductImageRepository) {}

  async execute(id: string): Promise<Result<ProductImageDto | null, HttpError>> {
    const productImage = await this.productImageRepository.findById(id);

    if (!productImage) {
      return failure(HttpError.notFound('Product image not found'));
    }

    const productImageDto = ProductImageMapper.toDto(productImage);
    return success(productImageDto);
  }
}
