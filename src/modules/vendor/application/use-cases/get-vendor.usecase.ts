import { IVendorRepository } from '../../domain/vendor.repository';
import { GetVendorDto } from '../dtos/get-vendor.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { VendorMapper } from '../../infrastructure/vendor.mapper';

export class GetVendorUseCase {
  constructor(private readonly vendorRepository: IVendorRepository) {}

  async execute(id: string): Promise<Result<GetVendorDto, HttpError>> {
    const vendor = await this.vendorRepository.findById(id);
    if (!vendor) {
      return failure(HttpError.notFound('Vendor not found.'));
    }

    const vendorDto = VendorMapper.toDto(vendor);
    return success(vendorDto);
  }
}
