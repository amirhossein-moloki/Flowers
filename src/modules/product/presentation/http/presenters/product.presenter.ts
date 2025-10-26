import { ProductDto } from '@/modules/product/application/dtos/product.dto';

export class ProductPresenter {
  static toJSON(product: ProductDto) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
