import { IProductImageRepository } from '../../domain/product-image.repository.interface';
import { UseCase } from '@/core/base/use-case';
import { ProductImage } from '../../domain/product-image.entity';
import { Result } from '@/core/utils/result';

export class FindAllProductImageUseCase
  implements UseCase<ProductImage[], null>
{
  constructor(private readonly productImageRepository: IProductImageRepository) {}

  async execute(): Promise<Result<ProductImage[], Error>> {
    return this.productImageRepository.findAll();
  }
}
