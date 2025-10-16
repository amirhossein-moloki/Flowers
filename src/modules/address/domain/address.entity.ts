import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';

interface AddressProps {
  formatted: string;
  city: string;
  province: string;
  postal_code: string;
  lat: number;
  lng: number;
  extra?: any;
}

export class Address extends Entity<AddressProps> {
  private constructor(props: AddressProps, id?: string) {
    super(props, id);
  }

  get formatted(): string {
    return this.props.formatted;
  }

  get city(): string {
    return this.props.city;
  }

  get province(): string {
    return this.props.province;
  }

  get postal_code(): string {
    return this.props.postal_code;
  }

  get lat(): number {
    return this.props.lat;
  }

  get lng(): number {
    return this.props.lng;
  }

  get extra(): any {
    return this.props.extra;
  }

  public static create(
    props: AddressProps,
    id?: string,
  ): Result<Address, Error> {
    const address = new Address(props, id);
    return success(address);
  }
}