import { IProductImageRepository } from '../../domain/product-image.repository.interface';
import { ProductImage } from '../../domain/product-image.entity';
import { CreateProductImageDto } from '../../presentation/http/dto/create-product-image.dto';
import { Result, success } from '@/core/utils/result';
import { UseCase } from '@/core/base/use-case';

export class CreateProductImageUseCase
  implements UseCase<ProductImage, CreateProductImageDto>
{
  constructor(private readonly productImageRepository: IProductImageRepository) {}

  async execute(
    data: CreateProductImageDto,
  ): Promise<Result<ProductImage, Error>> {
    const productImage = ProductImage.create(data);
    return this.productImageRepository.create(productImage.value);
  }
}
