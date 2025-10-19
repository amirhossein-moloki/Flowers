import { VendorOutlet } from '../../domain/vendor-outlet.entity';
import { UpdateVendorOutletInput } from '../../http/dto/update-vendor-outlet.schema';
import { Result, success, failure } from '@/core/utils/result';
import { IVendorOutletRepository } from '../../domain/vendor-outlet.repository';

export class UpdateVendorOutletUseCase {
  constructor(
    private readonly vendorOutletRepository: IVendorOutletRepository,
  ) {}

  async execute(
    id: string,
    input: UpdateVendorOutletInput,
  ): Promise<Result<VendorOutlet, Error>> {
    try {
      const outlet = await this.vendorOutletRepository.findById(id);
      if (!outlet) {
        return failure(new Error('Vendor outlet not found'));
      }

      const updatedOutlet = VendorOutlet.create(
        {
          ...outlet.props,
          ...input,
        },
        id,
      ).value;

      const savedOutlet = await this.vendorOutletRepository.save(updatedOutlet);
      return success(savedOutlet);
    } catch (error) {
      return failure(new Error(error.message));
    }
  }
}
