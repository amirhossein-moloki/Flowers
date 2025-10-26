import { IProductRepository } from '../../domain/product.repository';
import { Product, IProductProps } from '../../domain/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductDto } from '../dtos/product.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { ProductMapper } from '../../infrastructure/product.mapper';

export class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(dto: CreateProductDto): Promise<Result<ProductDto, HttpError>> {
    const productProps: IProductProps = {
      name: dto.name,
      description: dto.description,
      price: dto.price,
      stock: 0, // Default stock to 0
      vendorId: dto.vendorId,
    };

    const productResult = Product.create(productProps);

    if (!productResult.success) {
      return failure(HttpError.internalServerError(productResult.error.message));
    }

    const product = productResult.value;

    await this.productRepository.save(product);

    const productDto = ProductMapper.toDto(product);
    return success(productDto);
  }
}
