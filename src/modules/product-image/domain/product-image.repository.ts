import { ProductImage } from './product-image.entity';

export interface IProductImageRepository {
  findById(id: string): Promise<ProductImage | null>;
  findAll(): Promise<ProductImage[]>;
  save(productImage: ProductImage): Promise<void>;
  delete(id: string): Promise<void>;
}