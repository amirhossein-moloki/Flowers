import { ProductImage as ProductImageModel } from '@prisma/client';
import { ProductImage } from '../domain/product-image.entity';

export class ProductImageMapper {
  static toEntity(model: ProductImageModel): ProductImage {
    const entityResult = ProductImage.create(
      {
        productId: model.product_id,
        url: model.url,
        sort_order: model.sort_order,
      },
      model.id,
    );

    if (entityResult.success) {
      return entityResult.value;
    }
    return null;
  }

  static toModel(entity: ProductImage): any {
    return {
      id: entity.id,
      url: entity.url,
      sort_order: entity.sort_order,
      product: {
        connect: {
          id: entity.productId,
        },
      },
    };
  }

  static toDto(entity: ProductImage): any {
    return {
      id: entity.id,
      productId: entity.productId,
      url: entity.url,
      sort_order: entity.sort_order,
    };
  }
}
