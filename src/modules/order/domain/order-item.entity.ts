import { Entity } from '@/core/domain/entity';
import { Result, success } from '@/core/utils/result';

export interface IOrderItemProps {
  order_id?: string; // Is optional because it's set by the Order aggregate
  product_id: string;
  quantity: number;
  price: number; // Price per unit
}

export class OrderItem extends Entity<IOrderItemProps> {
  private constructor(props: IOrderItemProps, id?: string) {
    super(props, id);
  }

  get order_id(): string {
    return this.props.order_id;
  }

  get product_id(): string {
    return this.props.product_id;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get price(): number {
    return this.props.price;
  }

  // Calculated property
  get line_total(): number {
    return this.props.price * this.props.quantity;
  }

  public static create(
    props: Omit<IOrderItemProps, 'order_id'>, // order_id is not needed on creation
    id?: string,
  ): Result<OrderItem, Error> {
    // Validation can be added here (e.g., quantity > 0)
    const orderItem = new OrderItem(props, id);
    return success(orderItem);
  }
}