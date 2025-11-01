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
    const productResult = await this.productRepository.findById(id);

    if (productResult.isFailure()) {
      return failure(productResult.error);
    }

    const product = productResult.value;

    const updatedProductProps = { ...product.props, ...dto };
    const updatedProductResult = Product.create(updatedProductProps, product.id);

    if(updatedProductResult.isFailure()){
        return failure(HttpError.unprocessableEntity(updatedProductResult.error.message));
    }

    const updatedProduct = updatedProductResult.value;

    const saveResult = await this.productRepository.save(updatedProduct);
    if (saveResult.isFailure()) {
      return failure(saveResult.error);
    }

    const savedProduct = saveResult.value;

    const productDto = ProductMapper.toDto(savedProduct);
    return success(productDto);
  }
}
