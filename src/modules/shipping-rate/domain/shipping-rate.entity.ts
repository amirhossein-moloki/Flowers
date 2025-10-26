import { Entity } from '@/core/domain/entity';
import { Result, success, failure } from '@/core/utils/result';

export class ShippingRateCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ShippingRateCreationError';
  }
}

export interface IShippingRateProps {
  service_zone_id: string;
  rate: number;
  currency: string;
  weight_unit: string;
  min_weight: number;
  max_weight: number;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ShippingRate extends Entity<IShippingRateProps> {
  private constructor(props: IShippingRateProps, id?: string) {
    super(props, id);
  }

  get service_zone_id(): string {
    return this.props.service_zone_id;
  }

  get rate(): number {
    return this.props.rate;
  }

  get currency(): string {
    return this.props.currency;
  }

  get weight_unit(): string {
    return this.props.weight_unit;
  }

  get min_weight(): number {
    return this.props.min_weight;
  }

  get max_weight(): number {
    return this.props.max_weight;
  }

  get is_active(): boolean {
    return this.props.is_active;
  }

  public static create(props: IShippingRateProps, id?: string): Result<ShippingRate, ShippingRateCreationError> {
    if (!props.service_zone_id || props.rate == null) {
      return failure(new ShippingRateCreationError('Service zone ID and rate are required.'));
    }

    const shippingRate = new ShippingRate(
      {
        ...props,
        is_active: props.is_active ?? true,
      },
      id,
    );
    return success(shippingRate);
  }

  public update(props: Partial<IShippingRateProps>): Result<ShippingRate, Error> {
    const newProps = { ...this.props, ...props };
    return ShippingRate.create(newProps, this.id);
  }
}