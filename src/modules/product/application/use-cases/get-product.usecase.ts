import { IProductRepository } from '../../domain/product.repository';
import { ProductDto } from '../dtos/product.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { ProductMapper } from '../../infrastructure/product.mapper';

export class GetProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<Result<ProductDto, HttpError>> {
    const productResult = await this.productRepository.findById(id);

    if (productResult.isFailure()) {
      return failure(productResult.error);
    }

    const productDto = ProductMapper.toDto(productResult.value);
    return success(productDto);
  }
}
