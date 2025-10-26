import { Product } from '@/modules/product/domain/product.entity';

export class ProductPresenter {
  static toJSON(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      createdAt: product.props.createdAt,
      updatedAt: product.props.updatedAt,
    };
  }
}
