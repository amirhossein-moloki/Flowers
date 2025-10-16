import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';

interface VendorProps {
  name: string;
  legal_name: string;
  contact_phone: string;
  status?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Vendor extends Entity<VendorProps> {
  private constructor(props: VendorProps, id?: string) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get legal_name(): string {
    return this.props.legal_name;
  }

  get contact_phone(): string {
    return this.props.contact_phone;
  }

  get status(): string {
    return this.props.status;
  }

  public static create(props: VendorProps, id?: string): Result<Vendor, Error> {
    const vendor = new Vendor(
      {
        ...props,
        status: props.status ?? 'active',
      },
      id,
    );
    return success(vendor);
  }
}