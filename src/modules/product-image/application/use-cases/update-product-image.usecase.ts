import { IProductImageRepository } from '../../domain/product-image.repository.interface';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/http/http-error';
import { ProductImageDto } from '../dtos/product-image.dto';
import { ProductImageMapper } from '../../infrastructure/product-image.mapper';
import { UpdateProductImageDto } from '../dtos/update-product-image.dto';
import { ProductImage } from '../../domain/product-image.entity';

export class UpdateProductImageUseCase {
  constructor(private readonly productImageRepository: IProductImageRepository) {}

  async execute(
    id: string,
    dto: UpdateProductImageDto,
  ): Promise<Result<ProductImageDto, HttpError>> {
    const findResult = await this.productImageRepository.findById(id);

    if (!findResult.success) {
      return findResult;
    }
    const existingProductImage = findResult.value;

    if (!existingProductImage) {
      return failure(HttpError.notFound('Product image not found'));
    }

    const updatedProps = {
      ...existingProductImage.props,
      ...dto,
    };

    const updatedImageResult = ProductImage.create(
      updatedProps,
      existingProductImage.id,
    );

    if (!updatedImageResult.success) {
      return failure(
        HttpError.internalServerError(updatedImageResult.error.message),
      );
    }
    const updatedProductImage = updatedImageResult.value;

    const updateResult = await this.productImageRepository.update(
      updatedProductImage,
    );

    if (!updateResult.success) {
      return updateResult;
    }

    const productImageDto = ProductImageMapper.toDto(updateResult.value);
    return success(productImageDto);
  }
}
