import { VendorOutlet } from '../../domain/vendor-outlet.entity';
import { Result, success, failure } from '@/core/utils/result';
import { IVendorOutletRepository } from '../../domain/vendor-outlet.repository';
import { IVendorRepository } from '@/modules/vendor/domain/vendor.repository';

export class ListVendorOutletsUseCase {
  constructor(
    private readonly vendorOutletRepository: IVendorOutletRepository,
    private readonly vendorRepository: IVendorRepository,
  ) {}

  async execute(): Promise<Result<VendorOutlet[], Error>> {
    try {
      const outlets = await this.vendorOutletRepository.findAll();
      for (const outlet of outlets) {
        const vendor = await this.vendorRepository.findById(outlet.vendor_id);
        if (vendor) {
          outlet.props.vendor = vendor;
        }
      }
      return success(outlets);
    } catch (error) {
      return failure(new Error(error.message));
    }
  }
}
