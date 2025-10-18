import { Entity } from '@/core/domain/entity';
import { Result, success } from '@/core/utils/result';

interface DeliveryStatusProps {
  code: string;
  name: string;
  display_order: number;
}

export class DeliveryStatus extends Entity<DeliveryStatusProps> {
  private constructor(props: DeliveryStatusProps, id?: string) {
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

  public static create(
    props: DeliveryStatusProps,
    id?: string,
  ): Result<DeliveryStatus, Error> {
    const deliveryStatus = new DeliveryStatus(props, id);
    return success(deliveryStatus);
  }
}