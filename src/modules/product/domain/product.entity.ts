import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';

interface ProductProps {
  vendor_id: string;
  name: string;
  sku_code: string;
  description: string;
  base_price: number;
  prep_time_min?: number;
  is_active?: boolean;
  photo_url: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Product extends Entity<ProductProps> {
  private constructor(props: ProductProps, id?: string) {
    super(props, id);
  }

  get vendor_id(): string {
    return this.props.vendor_id;
  }

  get name(): string {
    return this.props.name;
  }

  get sku_code(): string {
    return this.props.sku_code;
  }

  get description(): string {
    return this.props.description;
  }

  get base_price(): number {
    return this.props.base_price;
  }

  get prep_time_min(): number {
    return this.props.prep_time_min;
  }

  get is_active(): boolean {
    return this.props.is_active;
  }

  get photo_url(): string {
    return this.props.photo_url;
  }

  public static create(
    props: ProductProps,
    id?: string,
  ): Result<Product, Error> {
    const product = new Product(
      {
        ...props,
        prep_time_min: props.prep_time_min ?? 20,
        is_active: props.is_active ?? true,
      },
      id,
    );
    return success(product);
  }
}