import { Entity } from '../../../core/domain/entity';
import { Product } from '../../product/domain/product.entity';
import { Result, success, failure } from '../../../core/utils/result';

export class OrderCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OrderCreationError';
  }
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

export interface IOrderItemProps {
  orderId: string;
  productId: string;
  product?: Product; // Can be populated
  quantity: number;
  price: number;
}

export class OrderItem extends Entity<IOrderItemProps> {
  private constructor(props: IOrderItemProps, id?: string) {
    super(props, id);
  }

  get productId(): string {
    return this.props.productId;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get price(): number {
    return this.props.price;
  }

  public static create(props: IOrderItemProps, id?: string): Result<OrderItem, OrderCreationError> {
    if (props.quantity <= 0) {
      return failure(new OrderCreationError('Quantity must be positive.'));
    }
    if (props.price < 0) {
      return failure(new OrderCreationError('Price cannot be negative.'));
    }
    return success(new OrderItem(props, id));
  }
}

export interface IOrderProps {
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Order extends Entity<IOrderProps> {
  private constructor(props: IOrderProps, id?: string) {
    super(props, id);
  }

  get userId(): string {
    return this.props.userId;
  }

  get items(): OrderItem[] {
    return this.props.items;
  }

  get status(): OrderStatus {
    return this.props.status;
  }

  get total(): number {
    return this.props.total;
  }

  public static create(props: IOrderProps, id?: string): Result<Order, OrderCreationError> {
    if (!props.userId) {
      return failure(new OrderCreationError('User ID is required.'));
    }
    if (props.items.length === 0) {
      return failure(new OrderCreationError('Order must have at least one item.'));
    }

    const order = new Order(
      {
        ...props,
        status: props.status ?? OrderStatus.PENDING,
      },
      id,
    );
    return success(order);
  }
}