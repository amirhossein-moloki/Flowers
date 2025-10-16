import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';
import { VehicleType } from '../../../../core/domain/enums';

interface ShippingRateProps {
  zone_id: string;
  vehicle_type: VehicleType;
  base_fee: number;
  per_km_fee?: number;
  min_fee?: number;
  max_fee: number;
}

export class ShippingRate extends Entity<ShippingRateProps> {
  private constructor(props: ShippingRateProps, id?: string) {
    super(props, id);
  }

  get zone_id(): string {
    return this.props.zone_id;
  }

  get vehicle_type(): VehicleType {
    return this.props.vehicle_type;
  }

  get base_fee(): number {
    return this.props.base_fee;
  }

  get per_km_fee(): number {
    return this.props.per_km_fee;
  }

  get min_fee(): number {
    return this.props.min_fee;
  }

  get max_fee(): number {
    return this.props.max_fee;
  }

  public static create(
    props: ShippingRateProps,
    id?: string,
  ): Result<ShippingRate, Error> {
    const shippingRate = new ShippingRate(
      {
        ...props,
        per_km_fee: props.per_km_fee ?? 0,
        min_fee: props.min_fee ?? 0,
      },
      id,
    );
    return success(shippingRate);
  }
}