import { Result } from '@/core/utils/result';
import { Product } from '@/modules/product/domain/product.entity';
import { HttpError } from '@/core/errors/http-error';

export interface IProductRepository {
  findById(id: string): Promise<Result<Product, HttpError>>;
  findAll(options: {
    page: number;
    limit: number;
    vendorId?: string;
  }): Promise<Result<Product[], HttpError>>;
  findByName(name: string): Promise<Result<Product, HttpError>>;
  save(product: Product): Promise<Result<Product, HttpError>>;
  delete(id: string): Promise<Result<boolean, HttpError>>;
}