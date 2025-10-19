import { ProductImage } from '@/modules/product-image/domain/product-image.entity';

export class ProductImagePresenter {
  static toJSON(productImage: ProductImage) {
    return {
      id: productImage.id,
      product_id: productImage.product_id,
      url: productImage.url,
      sort_order: productImage.sort_order,
      created_at: productImage.created_at,
      updated_at: productImage.updated_at,
    };
  }
}
