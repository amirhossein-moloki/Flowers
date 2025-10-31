import { IVendorRepository } from '../../domain/vendor.repository';
import { Vendor, IVendorProps } from '../../domain/vendor.entity';
import { CreateVendorDto } from '../dtos/create-vendor.dto';
import { VendorDto } from '../dtos/vendor.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { VendorMapper } from '../../infrastructure/vendor.mapper';

export class CreateVendorUseCase {
  constructor(private readonly vendorRepository: IVendorRepository) {}

  async execute(dto: CreateVendorDto): Promise<Result<VendorDto, HttpError>> {
    const existingByEmail = await this.vendorRepository.findByEmail(dto.email);
    if (existingByEmail) {
      return failure(HttpError.badRequest('Email already in use.'));
    }
    const existingByPhone = await this.vendorRepository.findByPhone(dto.phone);
    if (existingByPhone) {
      return failure(HttpError.badRequest('Phone already in use.'));
    }

    const vendorProps: IVendorProps = { ...dto };
    const vendorResult = Vendor.create(vendorProps);

    if (vendorResult.isFailure()) {
      return failure(HttpError.internalServerError(vendorResult.error?.message));
    }
    const vendor = vendorResult.value;

    if (!vendor) {
      return failure(HttpError.internalServerError('Failed to create vendor'));
    }

    await this.vendorRepository.save(vendor);

    const vendorDto = VendorMapper.toDto(vendor);
    return success(vendorDto);
  }
}
