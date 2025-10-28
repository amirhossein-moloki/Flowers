import { ProductImage } from './product-image.entity';
import { Result } from '@/core/utils/result';

export interface IProductImageRepository {
  create(productImage: ProductImage): Promise<Result<ProductImage, Error>>;
  findById(id: string): Promise<Result<ProductImage, Error>>;
  findAll(): Promise<Result<ProductImage[], Error>>;
  update(productImage: ProductImage): Promise<Result<ProductImage, Error>>;
  delete(id: string): Promise<Result<boolean, Error>>;
  findAllByProductId(productId: string): Promise<Result<ProductImage[], Error>>;
}
