import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';

interface VendorOutletProps {
  vendor_id: string;
  name: string;
  address_id: string;
  open_hours_json: any;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export class VendorOutlet extends Entity<VendorOutletProps> {
  private constructor(props: VendorOutletProps, id?: string) {
    super(props, id);
  }

  get vendor_id(): string {
    return this.props.vendor_id;
  }

  get name(): string {
    return this.props.name;
  }

  get address_id(): string {
    return this.props.address_id;
  }

  get open_hours_json(): any {
    return this.props.open_hours_json;
  }

  get is_active(): boolean {
    return this.props.is_active;
  }

  public static create(
    props: VendorOutletProps,
    id?: string,
  ): Result<VendorOutlet, Error> {
    const vendorOutlet = new VendorOutlet(
      {
        ...props,
        is_active: props.is_active ?? true,
      },
      id,
    );
    return success(vendorOutlet);
  }
}