import { ProductImage } from './product-image.entity';

export interface IProductImageRepository {
  save(productImage: ProductImage): Promise<void>;
  findById(id: string): Promise<ProductImage | null>;
  findAllByProductId(productId: string): Promise<ProductImage[]>;
  delete(id: string): Promise<void>;
}
