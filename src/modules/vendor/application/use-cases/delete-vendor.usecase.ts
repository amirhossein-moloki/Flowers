import { IVendorRepository } from '../../domain/vendor.repository';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class DeleteVendorUseCase {
  constructor(private readonly vendorRepository: IVendorRepository) {}

  async execute(id: string): Promise<Result<null, HttpError>> {
    const vendor = await this.vendorRepository.findById(id);
    if (!vendor) {
      return failure(HttpError.notFound('Vendor not found.'));
    }

    await this.vendorRepository.delete(id);

    return success(null);
  }
}
