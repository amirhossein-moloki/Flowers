import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';

// A simplified Vendor entity for dependency purposes.
export interface IVendorProps {
  name: string;
  is_active: boolean;
}

export class Vendor extends Entity<IVendorProps> {
  private constructor(props: IVendorProps, id?: string) {
    super(props, id);
  }

  public static create(props: IVendorProps, id?: string): Result<Vendor, Error> {
    const vendor = new Vendor(props, id);
    return success(vendor);
  }
}