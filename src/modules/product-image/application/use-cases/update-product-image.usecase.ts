import { IProductImageRepository } from '../../domain/product-image.repository';
import { UpdateProductImageDto } from '../dtos/update-product-image.dto';
import { ProductImageDto } from '../dtos/product-image.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { ProductImageMapper } from '../../infrastructure/product-image.mapper';
import { ProductImage } from '../../domain/product-image.entity';

export class UpdateProductImageUseCase {
  constructor(private readonly productImageRepository: IProductImageRepository) {}

  async execute(id: string, dto: UpdateProductImageDto): Promise<Result<ProductImageDto, HttpError>> {
    const productImage = await this.productImageRepository.findById(id);

    if (!productImage) {
      return failure(HttpError.notFound('ProductImage not found.'));
    }

    const updatedProductImageProps = { ...productImage.props, ...dto };
    const updatedProductImageResult = ProductImage.create(updatedProductImageProps, productImage.id);

    if(!updatedProductImageResult.success){
        return failure(HttpError.internalServerError(updatedProductImageResult.error.message));
    }

    const updatedProductImage = updatedProductImageResult.value;

    await this.productImageRepository.save(updatedProductImage);

    const productImageDto = ProductImageMapper.toDto(updatedProductImage);
    return success(productImageDto);
  }
}