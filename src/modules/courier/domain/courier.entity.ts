import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';
import { VehicleType } from '../../../../core/domain/enums';

interface CourierProps {
  user_id: string;
  vehicle_type: VehicleType;
  plate_number: string;
  is_active?: boolean;
  last_seen_at: Date;
  current_lat: number;
  current_lng: number;
}

export class Courier extends Entity<CourierProps> {
  private constructor(props: CourierProps, id?: string) {
    super(props, id);
  }

  get user_id(): string {
    return this.props.user_id;
  }

  get vehicle_type(): VehicleType {
    return this.props.vehicle_type;
  }

  get plate_number(): string {
    return this.props.plate_number;
  }

  get is_active(): boolean {
    return this.props.is_active;
  }

  get last_seen_at(): Date {
    return this.props.last_seen_at;
  }

  get current_lat(): number {
    return this.props.current_lat;
  }

  get current_lng(): number {
    return this.props.current_lng;
  }

  public static create(
    props: CourierProps,
    id?: string,
  ): Result<Courier, Error> {
    const courier = new Courier(
      {
        ...props,
        is_active: props.is_active ?? true,
      },
      id,
    );
    return success(courier);
  }
}