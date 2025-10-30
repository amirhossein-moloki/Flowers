import { ProductImage } from './product-image.entity';
import { Result } from '@/core/utils/result';
import { HttpError } from '@/core/http/http-error';

export interface IProductImageRepository {
  create(productImage: ProductImage): Promise<Result<ProductImage, HttpError>>;
  update(productImage: ProductImage): Promise<Result<ProductImage, HttpError>>;
  findById(id: string): Promise<Result<ProductImage | null, HttpError>>;
  findAllByProductId(productId: string): Promise<Result<ProductImage[], HttpError>>;
  findAll(): Promise<Result<ProductImage[], HttpError>>;
  delete(id: string): Promise<Result<null, HttpError>>;
}
