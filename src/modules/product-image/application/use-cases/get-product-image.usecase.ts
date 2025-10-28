import { IProductImageRepository } from '../../domain/product-image.repository.interface';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { ProductImage } from '../../domain/product-image.entity';
import { NotFoundError } from '@/core/errors/not-found.error';

export class GetProductImageUseCase {
  constructor(private readonly productImageRepository: IProductImageRepository) {}

  async execute(id: string): Promise<Result<ProductImage | null, HttpError>> {
    const productImageResult = await this.productImageRepository.findById(id);

    if (!productImageResult.success) {
      return failure(new NotFoundError('Product image not found'));
    }

    return success(productImageResult.value);
  }
}
