import { IProductRepository } from '@/modules/product/domain/product.repository';
import { ProductDto } from '../dtos/product.dto';
import { Result, success, failure } from '@/core/utils/result';
import { ProductMapper } from '../../infrastructure/product.mapper';
import { HttpError } from '@/core/errors/http-error';

export class GetAllProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: {
    page: number;
    limit: number;
    vendorId?: string;
  }): Promise<Result<ProductDto[], HttpError>> {
    const productsResult = await this.productRepository.findAll(input);
    if (productsResult.isFailure()) {
      return failure(productsResult.error);
    }
    const productDtos = productsResult.value.map(product => ProductMapper.toDto(product));
    return success(productDtos);
  }
}
