import { Entity } from '../../../core/domain/entity';
import { Result, success } from '../../../core/utils/result';

export interface ProductImageProps {
  productId: string;
  url: string;
  sort_order?: number;
}

export class ProductImage extends Entity<ProductImageProps> {
  private constructor(props: ProductImageProps, id?: string) {
    super(props, id);
  }

  get productId(): string {
    return this.props.productId;
  }

  get url(): string {
    return this.props.url;
  }

  get sort_order(): number | undefined {
    return this.props.sort_order;
  }

  public static create(
    props: ProductImageProps,
    id?: string,
  ): Result<ProductImage, Error> {
    const productImage = new ProductImage(
      {
        ...props,
        sort_order: props.sort_order ?? 0,
      },
      id,
    );
    return success(productImage);
  }
}