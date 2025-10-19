import { VendorOutlet } from '../../domain/vendor-outlet.entity';
import { Result, success, failure } from '@/core/utils/result';
import { IVendorOutletRepository } from '../../domain/vendor-outlet.repository';
import { IVendorRepository } from '@/modules/vendor/domain/vendor.repository';

export class GetVendorOutletUseCase {
  constructor(
    private readonly vendorOutletRepository: IVendorOutletRepository,
    private readonly vendorRepository: IVendorRepository,
  ) {}

  async execute(id: string): Promise<Result<VendorOutlet, Error>> {
    try {
      const outlet = await this.vendorOutletRepository.findById(id);
      if (!outlet) {
        return failure(new Error('Vendor outlet not found'));
      }
      const vendor = await this.vendorRepository.findById(outlet.vendor_id);
      if (vendor) {
        outlet.props.vendor = vendor;
      }
      return success(outlet);
    } catch (error) {
      return failure(new Error(error.message));
    }
  }
}
