import { VendorOutlet } from '../../domain/vendor-outlet.entity';
import { CreateVendorOutletInput } from '../../http/dto/create-vendor-outlet.schema';
import { Result, success, failure } from '@/core/utils/result';
import { IVendorOutletRepository } from '../../domain/vendor-outlet.repository';
import { VendorOutletCreationError } from '../../domain/vendor-outlet.entity';

export class CreateVendorOutletUseCase {
  constructor(
    private readonly vendorOutletRepository: IVendorOutletRepository,
  ) {}

  async execute(
    input: CreateVendorOutletInput,
  ): Promise<Result<VendorOutlet, Error>> {
    const outletResult = VendorOutlet.create({
      ...input,
      vendor_id: input.vendorId,
      is_active: input.isActive,
    });

    if (!outletResult.success) {
      return failure(outletResult.error);
    }

    try {
      const savedOutlet = await this.vendorOutletRepository.save(
        outletResult.value,
      );
      return success(savedOutlet);
    } catch (error) {
      return failure(new VendorOutletCreationError(error.message));
    }
  }
}
