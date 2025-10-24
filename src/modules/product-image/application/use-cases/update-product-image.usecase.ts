import { IProductImageRepository } from '../../domain/product-image.repository.interface';
import { UseCase } from '@/core/base/use-case';
import { ProductImage } from '../../domain/product-image.entity';
import { Result } from '@/core/utils/result';
import { UpdateProductImageDto } from '../../presentation/http/dto/update-product-image.dto';

export class UpdateProductImageUseCase
  implements
    UseCase<
      ProductImage,
      { id: string; product_id: string; data: UpdateProductImageDto }
    >
{
  constructor(
    private readonly productImageRepository: IProductImageRepository,
  ) {}

  async execute({
    id,
    product_id,
    data,
  }: {
    id: string;
    product_id: string;
    data: UpdateProductImageDto;
  }): Promise<Result<ProductImage, Error>> {
    const productImage = ProductImage.create(
      {
        ...data,
        product_id,
      },
      id,
    );
    return this.productImageRepository.update(productImage.value);
  }
}
