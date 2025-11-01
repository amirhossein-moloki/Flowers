import { IProductRepository } from '../../domain/product.repository';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class DeleteProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<Result<boolean, HttpError>> {
    const productResult = await this.productRepository.findById(id);

    if (productResult.isFailure()) {
      return failure(productResult.error);
    }

    const deleteResult = await this.productRepository.delete(id);
    if (deleteResult.isFailure()) {
      return failure(deleteResult.error);
    }

    return success(true);
  }
}
