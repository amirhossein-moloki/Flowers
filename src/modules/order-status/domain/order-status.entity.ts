import { Entity } from '@/core/domain/entity';
import { Result, success } from '@/core/utils/result';

interface OrderStatusProps {
  code: string;
  name: string;
  display_order: number;
  is_terminal?: boolean;
}

export class OrderStatus extends Entity<OrderStatusProps> {
  private constructor(props: OrderStatusProps, id?: string) {
    super(props, id);
  }

  get code(): string {
    return this.props.code;
  }

  get name(): string {
    return this.props.name;
  }

  get display_order(): number {
    return this.props.display_order;
  }

  get is_terminal(): boolean | undefined {
    return this.props.is_terminal;
  }

  public static create(
    props: OrderStatusProps,
    id?: string,
  ): Result<OrderStatus, Error> {
    const orderStatus = new OrderStatus(
      {
        ...props,
        is_terminal: props.is_terminal ?? false,
      },
      id,
    );
    return success(orderStatus);
  }
}