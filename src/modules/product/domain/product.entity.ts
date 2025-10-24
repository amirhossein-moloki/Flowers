import { Entity } from '@/core/domain/entity';
import { Result, success, failure } from '@/core/utils/result';

export class ProductCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProductCreationError';
  }
}

export interface IProductProps {
  name: string;
  description: string | null;
  price: number;
  stock: number;
  vendorId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product extends Entity<IProductProps> {
  private constructor(props: IProductProps, id?: string) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | null {
    return this.props.description;
  }

  get price(): number {
    return this.props.price;
  }

  get stock(): number {
    return this.props.stock;
  }

  public static create(props: IProductProps, id?: string): Result<Product, ProductCreationError> {
    if (!props.name || props.name.trim().length === 0) {
      return failure(new ProductCreationError('Product name cannot be empty.'));
    }
    if (props.price < 0) {
      return failure(new ProductCreationError('Price cannot be negative.'));
    }

    const product = new Product(
      {
        ...props,
        description: props.description ?? null,
      },
      id,
    );
    return success(product);
  }
}