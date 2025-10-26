import { Entity } from '@/core/domain/entity';
import { Result, success, failure } from '@/core/utils/result';

export class VendorCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VendorCreationError';
  }
}

export interface IVendorProps {
  name: string;
  description?: string | null;
  email: string;
  phone: string;
  address: string;
  is_active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Vendor extends Entity<IVendorProps> {
  private constructor(props: IVendorProps, id?: string) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | null {
    return this.props.description ?? null;
  }

  get email(): string {
    return this.props.email;
  }

  get phone(): string {
    return this.props.phone;
  }

  get address(): string {
    return this.props.address;
  }

  get is_active(): boolean {
    return this.props.is_active ?? false;
  }

  public static create(props: IVendorProps, id?: string): Result<Vendor, VendorCreationError> {
    if (!props.name || !props.email || !props.phone || !props.address) {
      return failure(new VendorCreationError('Vendor name, email, phone, and address are required.'));
    }

    const vendor = new Vendor(
      {
        ...props,
        description: props.description ?? null,
        is_active: props.is_active ?? true,
      },
      id,
    );
    return success(vendor);
  }
}