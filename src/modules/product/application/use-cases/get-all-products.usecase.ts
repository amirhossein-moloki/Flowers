import { IProductRepository } from '@/modules/product/domain/product.repository';
import { Product } from '@/modules/product/domain/product.entity';
import { Result, success } from '@/core/utils/result';

export class GetAllProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: {
    page: number;
    limit: number;
    vendorId?: string;
  }): Promise<Result<Product[], Error>> {
    const products = await this.productRepository.findAll(input);
    return success(products);
  }
}
