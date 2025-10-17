import { IProductImageRepository } from '../../domain/product-image.repository';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';

export class DeleteProductImageUseCase {
  constructor(private readonly productImageRepository: IProductImageRepository) {}

  async execute(id: string): Promise<Result<void, HttpError>> {
    const productImage = await this.productImageRepository.findById(id);

    if (!productImage) {
      return failure(HttpError.notFound('ProductImage not found.'));
    }

    await this.productImageRepository.delete(id);

    return success(undefined);
  }
}