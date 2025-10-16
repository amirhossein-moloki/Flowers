import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';

interface DriverLocationProps {
  delivery_id: string;
  courier_id: string;
  lat: number;
  lng: number;
  speed_kmh: number;
  heading_deg: number;
  recorded_at: Date;
}

export class DriverLocation extends Entity<DriverLocationProps> {
  private constructor(props: DriverLocationProps, id?: string) {
    super(props, id);
  }

  get delivery_id(): string {
    return this.props.delivery_id;
  }

  get courier_id(): string {
    return this.props.courier_id;
  }

  get lat(): number {
    return this.props.lat;
  }

  get lng(): number {
    return this.props.lng;
  }

  get speed_kmh(): number {
    return this.props.speed_kmh;
  }

  get heading_deg(): number {
    return this.props.heading_deg;
  }

  get recorded_at(): Date {
    return this.props.recorded_at;
  }

  public static create(
    props: DriverLocationProps,
    id?: string,
  ): Result<DriverLocation, Error> {
    const driverLocation = new DriverLocation(props, id);
    return success(driverLocation);
  }
}