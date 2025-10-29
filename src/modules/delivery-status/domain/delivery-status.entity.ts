import { Entity } from '@/core/domain/entity';
import { Result, success } from '@/core/utils/result';

interface DeliveryStatusProps {
  delivery_id: string;
  status: string;
  notes?: string | null;
}

export class DeliveryStatus extends Entity<DeliveryStatusProps> {
  get delivery_id(): string {
    return this.props.delivery_id;
  }

  get status(): string {
    return this.props.status;
  }

  get notes(): string | undefined | null {
    return this.props.notes;
  }

  private constructor(props: DeliveryStatusProps, id?: string) {
    super(props, id);
  }

  public static create(
    props: DeliveryStatusProps,
    id?: string,
  ): Result<DeliveryStatus, Error> {
    const deliveryStatus = new DeliveryStatus(props, id);
    return success(deliveryStatus);
  }
}
