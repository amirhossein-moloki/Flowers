import { Entity } from '@/core/domain/entity';
import { Result, success } from '@/core/utils/result';
import { Address } from '@/modules/address/domain/address.entity';

interface CustomerAddressProps {
  user_id: string;
  address_id: string;
  is_default?: boolean;
  label: string;
  address?: Address;
}

export class CustomerAddress extends Entity<CustomerAddressProps> {
  private constructor(props: CustomerAddressProps, id?: string) {
    super(props, id);
  }

  get user_id(): string {
    return this.props.user_id;
  }

  get address_id(): string {
    return this.props.address_id;
  }

  get is_default(): boolean {
    return this.props.is_default;
  }

  get label(): string {
    return this.props.label;
  }

  get address(): Address {
    return this.props.address;
  }

  public static create(
    props: CustomerAddressProps,
    id?: string,
  ): Result<CustomerAddress, Error> {
    const customerAddress = new CustomerAddress(
      {
        ...props,
        is_default: props.is_default ?? false,
      },
      id,
    );
    return success(customerAddress);
  }
}