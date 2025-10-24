import { IProductRepository } from '../../domain/product.repository';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductDto } from '../dtos/product.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { ProductMapper } from '../../infrastructure/product.mapper';
import { Product } from '../../domain/product.entity';

export class UpdateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string, dto: UpdateProductDto): Promise<Result<ProductDto, HttpError>> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      return failure(HttpError.notFound('Product not found.'));
    }

    const updatedProductProps = { ...product.props, ...dto };
    const updatedProductResult = Product.create(updatedProductProps, product.id);

    if(!updatedProductResult.success){
        return failure(HttpError.internalServerError(updatedProductResult.error.message));
    }

    const updatedProduct = updatedProductResult.value;

    await this.productRepository.save(updatedProduct);

    const productDto = ProductMapper.toDto(updatedProduct);
    return success(productDto);
  }
}