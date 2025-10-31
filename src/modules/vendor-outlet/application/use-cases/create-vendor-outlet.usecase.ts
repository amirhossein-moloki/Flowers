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
      vendorId: input.vendorId,
      is_active: input.is_active,
    });

    if (outletResult.isFailure()) {
      return failure(outletResult.error as VendorOutletCreationError);
    }

    const outlet = outletResult.value;
    if (!outlet) {
      return failure(new VendorOutletCreationError('Failed to create outlet'));
    }

    try {
      const savedOutlet = await this.vendorOutletRepository.save(outlet);
      return success(savedOutlet);
    } catch (error: any) {
      return failure(new VendorOutletCreationError(error.message));
    }
  }
}
