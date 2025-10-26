import { IProductImageRepository } from '../../domain/product-image.repository.interface';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { ProductImageDto } from '../dtos/product-image.dto';
import { ProductImageMapper } from '../../infrastructure/product-image.mapper';
import { UpdateProductImageDto } from '../dtos/update-product-image.dto';

export class UpdateProductImageUseCase {
  constructor(private readonly productImageRepository: IProductImageRepository) {}

  async execute(
    id: string,
    dto: UpdateProductImageDto,
  ): Promise<Result<ProductImageDto, HttpError>> {
    const existingProductImage = await this.productImageRepository.findById(id);

    if (!existingProductImage) {
      return failure(HttpError.notFound('Product image not found'));
    }

    const updatedProductImage = Object.assign(existingProductImage, dto);

    await this.productImageRepository.save(updatedProductImage);

    const productImageDto = ProductImageMapper.toDto(updatedProductImage);
    return success(productImageDto);
  }
}
