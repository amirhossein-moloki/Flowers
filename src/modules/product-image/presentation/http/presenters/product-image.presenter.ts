import { ProductImage } from '@/modules/product-image/domain/product-image.entity';

export class ProductImagePresenter {
  constructor(private readonly productImage: ProductImage) {}

  toJSON() {
    return {
      id: this.productImage.id,
      product_id: this.productImage.product_id,
      url: this.productImage.url,
      sort_order: this.productImage.sort_order,
    };
  }
}
