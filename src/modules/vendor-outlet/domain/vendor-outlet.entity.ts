import { Entity } from '@/core/domain/entity';
import { Result, success, failure } from '@/core/utils/result';
import { Vendor } from '@/modules/vendor/domain/vendor.entity';

export class VendorOutletCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VendorOutletCreationError';
  }
}

export interface IVendorOutletProps {
  vendor_id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  vendor?: Vendor;
}

export class VendorOutlet extends Entity<IVendorOutletProps> {
  private constructor(props: IVendorOutletProps, id?: string) {
    super(props, id);
  }

  get vendor_id(): string {
    return this.props.vendor_id;
  }

  get name(): string {
    return this.props.name;
  }

  get address(): string {
    return this.props.address;
  }

  get latitude(): number {
    return this.props.latitude;
  }

  get longitude(): number {
    return this.props.longitude;
  }

  get is_active(): boolean {
    return this.props.is_active;
  }

  get vendor(): Vendor | undefined {
    return this.props.vendor;
  }

  public static create(
    props: IVendorOutletProps,
    id?: string,
  ): Result<VendorOutlet, VendorOutletCreationError> {
    if (!props.vendor_id || !props.name || !props.address) {
      return failure(
        new VendorOutletCreationError(
          'Vendor ID, name, and address are required.',
        ),
      );
    }

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
