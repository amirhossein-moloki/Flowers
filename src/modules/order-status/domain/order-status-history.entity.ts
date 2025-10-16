import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';
import { ActorType } from '../../../../core/domain/enums';

interface OrderStatusHistoryProps {
  order_id: string;
  status_id: string;
  actor_type: ActorType;
  actor_id: string;
  payload_json: any;
  created_at?: Date;
}

export class OrderStatusHistory extends Entity<OrderStatusHistoryProps> {
  private constructor(props: OrderStatusHistoryProps, id?: string) {
    super(props, id);
  }

  get order_id(): string {
    return this.props.order_id;
  }

  get status_id(): string {
    return this.props.status_id;
  }

  get actor_type(): ActorType {
    return this.props.actor_type;
  }

  get actor_id(): string {
    return this.props.actor_id;
  }

  get payload_json(): any {
    return this.props.payload_json;
  }

  public static create(
    props: OrderStatusHistoryProps,
    id?: string,
  ): Result<OrderStatusHistory, Error> {
    const orderStatusHistory = new OrderStatusHistory(props, id);
    return success(orderStatusHistory);
  }
}