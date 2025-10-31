import { IVendorRepository } from '../../domain/vendor.repository';
import { Vendor } from '../../domain/vendor.entity';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class UpdateVendorUseCase {
  constructor(private readonly vendorRepository: IVendorRepository) {}

  async execute(id: string, data: Partial<Vendor>): Promise<Result<Vendor, HttpError>> {
    const vendor = await this.vendorRepository.findById(id);
    if (!vendor) {
      return failure(HttpError.notFound('Vendor not found.'));
    }

    const updatedProps = { ...vendor.props, ...data };
    const updatedVendorResult = Vendor.create(updatedProps, vendor.id);

    if (updatedVendorResult.isFailure()) {
      return failure(HttpError.internalServerError(updatedVendorResult.error?.message));
    }

    const updatedVendor = updatedVendorResult.value;
    if (!updatedVendor) {
      return failure(HttpError.internalServerError('Failed to update vendor'));
    }

    await this.vendorRepository.save(updatedVendor);

    return success(updatedVendor);
  }
}
