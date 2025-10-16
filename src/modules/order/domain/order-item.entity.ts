import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';

interface OrderItemProps {
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

export class OrderItem extends Entity<OrderItemProps> {
  private constructor(props: OrderItemProps, id?: string) {
    super(props, id);
  }

  get orderId(): string {
    return this.props.orderId;
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

  public static create(
    props: OrderItemProps,
    id?: string,
  ): Result<OrderItem, Error> {
    // Add validation logic here
    const orderItem = new OrderItem(props, id);
    return success(orderItem);
  }
}