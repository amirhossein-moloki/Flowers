import { Product as PrismaProduct } from '@prisma/client';
import { Product, IProductProps } from '../domain/product.entity';
import { Result } from '../../../../core/utils/result';

export class ProductMapper {
  public static toDomain(prismaProduct: PrismaProduct): Product {
    const props: IProductProps = {
      name: prismaProduct.name,
      description: prismaProduct.description,
      price: prismaProduct.price,
      stock: prismaProduct.stock,
      createdAt: prismaProduct.createdAt,
      updatedAt: prismaProduct.updatedAt,
    };

    const productResult = Product.create(props, prismaProduct.id);

    if (!productResult.success) {
      // This indicates a data integrity issue, as data from the DB should be valid.
      throw new Error(`Could not create domain product from prisma data: ${productResult.error.message}`);
    }

    return productResult.value;
  }

  public static toPersistence(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    };
  }

  public static toDto(product: Product): any {
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