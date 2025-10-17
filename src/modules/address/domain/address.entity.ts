import { Entity } from '@/core/domain/entity';
import { Result, success, failure } from '@/core/utils/result';

export class AddressCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AddressCreationError';
  }
}

export interface IAddressProps {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country:string;
  isResidential?: boolean | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Address extends Entity<IAddressProps> {
  private constructor(props: IAddressProps, id?: string) {
    super(props, id);
  }

  get street(): string {
    return this.props.street;
  }

  get city(): string {
    return this.props.city;
  }

  get state(): string {
    return this.props.state;
  }

  get zipCode(): string {
    return this.props.zipCode;
  }

  get country(): string {
    return this.props.country;
  }

  get isResidential(): boolean | null {
    return this.props.isResidential ?? null;
  }

  public static create(props: IAddressProps, id?: string): Result<Address, AddressCreationError> {
    if (!props.street || !props.city || !props.state || !props.zipCode || !props.country) {
      return failure(new AddressCreationError('Address fields cannot be empty.'));
    }

    const address = new Address(
      {
        ...props,
        isResidential: props.isResidential ?? null,
      },
      id,
    );
    return success(address);
  }
}