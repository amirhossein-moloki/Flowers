import { IProductRepository } from '../../domain/product.repository';
import { ProductDto } from '../dtos/product.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { ProductMapper } from '../../infrastructure/product.mapper';

export class GetProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<Result<ProductDto, HttpError>> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      return failure(HttpError.notFound('Product not found.'));
    }

    const productDto = ProductMapper.toDto(product);
    return success(productDto);
  }
}