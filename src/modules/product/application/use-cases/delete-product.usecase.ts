import { IProductRepository } from '../../domain/product.repository';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';

export class DeleteProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<Result<void, HttpError>> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      return failure(HttpError.notFound('Product not found.'));
    }

    await this.productRepository.delete(id);

    return success(undefined);
  }
}