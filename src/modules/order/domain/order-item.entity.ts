import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';

interface OrderItemProps {
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  note: string;
}

export class OrderItem extends Entity<OrderItemProps> {
  private constructor(props: OrderItemProps, id?: string) {
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

  get unit_price(): number {
    return this.props.unit_price;
  }

  get line_total(): number {
    return this.props.line_total;
  }

  get note(): string {
    return this.props.note;
  }

  public static create(
    props: OrderItemProps,
    id?: string,
  ): Result<OrderItem, Error> {
    const orderItem = new OrderItem(props, id);
    return success(orderItem);
  }
}