import { IProductImageRepository } from '../../domain/product-image.repository';
import { ProductImage } from '../../domain/product-image.entity';
import { CreateProductImageDto } from '../dtos/create-product-image.dto';
import { ProductImageDto } from '../dtos/product-image.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { ProductImageMapper } from '../../infrastructure/product-image.mapper';

export class CreateProductImageUseCase {
  constructor(private readonly productImageRepository: IProductImageRepository) {}

  async execute(dto: CreateProductImageDto): Promise<Result<ProductImageDto, HttpError>> {
    const productImageResult = ProductImage.create(dto);

    if (!productImageResult.success) {
      return failure(HttpError.internalServerError(productImageResult.error.message));
    }

    const productImage = productImageResult.value;

    await this.productImageRepository.save(productImage);

    const productImageDto = ProductImageMapper.toDto(productImage);
    return success(productImageDto);
  }
}