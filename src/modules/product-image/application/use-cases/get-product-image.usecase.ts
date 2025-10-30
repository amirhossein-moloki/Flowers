import { IProductImageRepository } from '../../domain/product-image.repository.interface';
import { Result, success } from '@/core/utils/result';
import { HttpError } from '@/core/http/http-error';
import { ProductImageDto } from '../dtos/product-image.dto';
import { ProductImageMapper } from '../../infrastructure/product-image.mapper';

export class GetProductImageUseCase {
  constructor(private readonly productImageRepository: IProductImageRepository) {}

  async execute(id: string): Promise<Result<ProductImageDto | null, HttpError>> {
    const result = await this.productImageRepository.findById(id);

    if (result.success) {
      if (!result.value) {
        return success(null);
      }
      const productImageDto = ProductImageMapper.toDto(result.value);
      return success(productImageDto);
    } else {
      return result;
    }
  }
}
