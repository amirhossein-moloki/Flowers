import { IVendorRepository } from '../../domain/vendor.repository';
import { Vendor } from '../../domain/vendor.entity';
import { Result, success } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class ListVendorsUseCase {
  constructor(private readonly vendorRepository: IVendorRepository) {}

  async execute(): Promise<Result<Vendor[], HttpError>> {
    const vendors = await this.vendorRepository.findAll();
    return success(vendors);
  }
}
