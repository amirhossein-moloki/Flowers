import { Result } from '@/core/utils/result';
import { ProductImage } from './product-image.entity';

export interface IProductImageRepository {
  create(productImage: ProductImage): Promise<Result<ProductImage, Error>>;
  findById(id: string): Promise<Result<ProductImage, Error>>;
  findAll(): Promise<Result<ProductImage[], Error>>;
  update(productImage: ProductImage): Promise<Result<ProductImage, Error>>;
  delete(id: string): Promise<Result<boolean, Error>>;
}
