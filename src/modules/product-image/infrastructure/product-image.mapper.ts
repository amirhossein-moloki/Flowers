import { ProductImage } from '../domain/product-image.entity';
import { ProductImageDto } from '../application/dtos/product-image.dto';

export class ProductImageMapper {
  static toDto(productImage: ProductImage): ProductImageDto {
    return {
      id: productImage.id,
      product_id: productImage.product_id,
      url: productImage.url,
      sort_order: productImage.sort_order,
    };
  }

  static toDomain(dto: ProductImageDto): ProductImage {
    const result = ProductImage.create({
      product_id: dto.product_id,
      url: dto.url,
      sort_order: dto.sort_order,
    }, dto.id);

    if (result.success) {
      return result.value;
    } else {
      throw result.error;
    }
  }

  static toPersistence(productImage: ProductImage): any {
    return {
      id: productImage.id,
      product_id: productImage.product_id,
      url: productImage.url,
      sort_order: productImage.sort_order,
    };
  }
}