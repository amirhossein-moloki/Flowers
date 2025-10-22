import { Entity } from '@/core/domain/entity';
import { Result, success } from '@/core/logic/result';
import { randomUUID } from 'crypto';

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

  public static create(
    props: DriverLocationProps,
    id?: string,
  ): Result<DriverLocation, Error> {
    const driverLocation = new DriverLocation(props, id || randomUUID());
    return success(driverLocation);
  }
}
