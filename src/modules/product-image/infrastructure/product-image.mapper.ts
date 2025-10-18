import { ProductImage as PrismaProductImage } from '@prisma/client';
import { ProductImage } from '../domain/product-image.entity';

export class ProductImageMapper {
  static toDomain(
    prismaProductImage: PrismaProductImage,
  ): ProductImage {
    const productImageResult = ProductImage.create(
      {
        product_id: prismaProductImage.product_id,
        url: prismaProductImage.url,
        sort_order: prismaProductImage.sort_order,
      },
      prismaProductImage.id,
    );
    if (productImageResult.isFailure) {
      throw new Error('Could not map PrismaProductImage to domain');
    }
    return productImageResult.value;
  }

  static toPersistence(
    productImage: ProductImage,
  ): PrismaProductImage {
    return {
      id: productImage.id,
      product_id: productImage.product_id,
      url: productImage.url,
      sort_order: productImage.sort_order,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}