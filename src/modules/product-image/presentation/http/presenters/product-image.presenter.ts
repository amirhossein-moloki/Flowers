import { ProductImage } from '@/modules/product-image/domain/product-image.entity';

export class ProductImagePresenter {
  constructor(private readonly productImage: ProductImage) {}

  toJSON() {
    return {
      id: this.productImage.id,
      productId: this.productImage.productId,
      url: this.productImage.url,
      sort_order: this.productImage.sort_order,
    };
  }
}
