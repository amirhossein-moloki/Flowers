import { Entity } from '@/core/domain/entity';
import { Result, success } from '@/core/utils/result';
import { VehicleType } from '@prisma/client';

interface DeliveryProps {
  order_id: string;
  courier_id: string;
  status_id: string;
  vehicle_type: VehicleType;
  assigned_at: Date;
  pickup_at: Date;
  dropoff_at: Date;
  distance_meters: number;
  eta_seconds: number;
  failure_reason: string;
  tracking_number: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Delivery extends Entity<DeliveryProps> {
  private constructor(props: DeliveryProps, id?: string) {
    super(props, id);
  }

  get tracking_number(): string {
    return this.props.tracking_number;
  }

  get order_id(): string {
    return this.props.order_id;
  }

  get courier_id(): string {
    return this.props.courier_id;
  }

  get status_id(): string {
    return this.props.status_id;
  }

  get vehicle_type(): VehicleType {
    return this.props.vehicle_type;
  }

  get assigned_at(): Date {
    return this.props.assigned_at;
  }

  get pickup_at(): Date {
    return this.props.pickup_at;
  }

  get dropoff_at(): Date {
    return this.props.dropoff_at;
  }

  get distance_meters(): number {
    return this.props.distance_meters;
  }

  get eta_seconds(): number {
    return this.props.eta_seconds;
  }

  get failure_reason(): string {
    return this.props.failure_reason;
  }

  public static create(
    props: DeliveryProps,
    id?: string,
  ): Result<Delivery, Error> {
    const delivery = new Delivery(props, id);
    return success(delivery);
  }
}