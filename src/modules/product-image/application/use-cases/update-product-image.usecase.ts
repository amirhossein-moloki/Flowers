import { IProductImageRepository } from '../../domain/product-image.repository.interface';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { ProductImageDto } from '../dtos/product-image.dto';
import { ProductImageMapper } from '../../infrastructure/product-image.mapper';
import { UpdateProductImageDto } from '../dtos/update-product-image.dto';

export class UpdateProductImageUseCase {
  constructor(private readonly productImageRepository: IProductImageRepository) {}

  async execute({
    id,
    data,
  }: {
    id: string;
    data: UpdateProductImageDto;
  }): Promise<Result<ProductImage, HttpError>> {
    const existingProductImageResult =
      await this.productImageRepository.findById(id);

    if (!existingProductImageResult.success) {
      return existingProductImageResult;
    }

    const existingProductImage = existingProductImageResult.value;

    const updatedProductImageResult = existingProductImage.update(data);

    if (!updatedProductImageResult.success) {
      return updatedProductImageResult;
    }

    const updatedProductImage = updatedProductImageResult.value;

    await this.productImageRepository.update(updatedProductImage);

    return success(updatedProductImage);
  }
}
