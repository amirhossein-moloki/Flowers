import { Product } from '../domain/product.entity';
import { ProductDto } from '../application/dtos/product.dto';

export class ProductMapper {
  static toDto(product: Product): ProductDto {
    return {
      id: product.id,
      vendor_id: product.vendor_id,
      name: product.name,
      sku_code: product.sku_code,
      description: product.description,
      base_price: product.base_price,
      prep_time_min: product.prep_time_min,
      is_active: product.is_active,
      photo_url: product.photo_url,
    };
  }

  static toDomain(dto: ProductDto): Product {
    const result = Product.create({
      vendor_id: dto.vendor_id,
      name: dto.name,
      sku_code: dto.sku_code,
      description: dto.description,
      base_price: dto.base_price,
      prep_time_min: dto.prep_time_min,
      is_active: dto.is_active,
      photo_url: dto.photo_url,
    }, dto.id);

    if (result.success) {
      return result.value;
    } else {
      throw result.error;
    }
  }

  static toPersistence(product: Product): any {
    return {
      id: product.id,
      vendor_id: product.vendor_id,
      name: product.name,
      sku_code: product.sku_code,
      description: product.description,
      base_price: product.base_price,
      prep_time_min: product.prep_time_min,
      is_active: product.is_active,
      photo_url: product.photo_url,
    };
  }
}