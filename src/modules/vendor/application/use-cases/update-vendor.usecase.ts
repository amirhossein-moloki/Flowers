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

    const updatedVendor = Object.assign(vendor, data);

    await this.vendorRepository.update(updatedVendor);

    return success(updatedVendor);
  }
}
