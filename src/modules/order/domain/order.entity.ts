import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';
import { OrderItem } from './order-item.entity';

interface OrderProps {
  userId: string;
  items: OrderItem[];
  total: number;
  status: string; // e.g., 'pending', 'shipped', 'delivered'
  createdAt?: Date;
}

export class Order extends Entity<OrderProps> {
  private constructor(props: OrderProps, id?: string) {
    super(props, id);
  }

  get userId(): string {
    return this.props.userId;
  }

  get items(): OrderItem[] {
    return this.props.items;
  }

  get total(): number {
    return this.props.total;
  }

  get status(): string {
    return this.props.status;
  }

  public static create(props: OrderProps, id?: string): Result<Order, Error> {
    // Add validation logic here
    const order = new Order(props, id);
    return success(order);
  }
}