import { IProductRepository } from '@/modules/product/domain/product.repository';
import { ProductDto } from '../dtos/product.dto';
import { Result, success } from '@/core/utils/result';
import { ProductMapper } from '../../infrastructure/product.mapper';

export class GetAllProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: {
    page: number;
    limit: number;
    vendorId?: string;
  }): Promise<Result<ProductDto[], Error>> {
    const products = await this.productRepository.findAll(input);
    const productDtos = products.map(product => ProductMapper.toDto(product));
    return success(productDtos);
  }
}
