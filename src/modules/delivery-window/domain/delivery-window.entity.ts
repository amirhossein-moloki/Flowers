import { Entity } from '@/core/domain/entity';
import { Result, success } from '@/core/utils/result';

interface DeliveryWindowProps {
  label: string;
  start_time: string;
  end_time: string;
  cutoff_time: string;
  zone_id: string;
  is_active?: boolean;
}

export class DeliveryWindow extends Entity<DeliveryWindowProps> {
  private constructor(props: DeliveryWindowProps, id?: string) {
    super(props, id);
  }

  get label(): string {
    return this.props.label;
  }

  get start_time(): string {
    return this.props.start_time;
  }

  get end_time(): string {
    return this.props.end_time;
  }

  get cutoff_time(): string {
    return this.props.cutoff_time;
  }

  get zone_id(): string {
    return this.props.zone_id;
  }

  get is_active(): boolean {
    return this.props.is_active;
  }

  public static create(
    props: DeliveryWindowProps,
    id?: string,
  ): Result<DeliveryWindow, Error> {
    const deliveryWindow = new DeliveryWindow(
      {
        ...props,
        is_active: props.is_active ?? true,
      },
      id,
    );
    return success(deliveryWindow);
  }
}