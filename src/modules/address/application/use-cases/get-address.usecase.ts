import { IAddressRepository } from '../../domain/address.repository';
import { AddressDto } from '../dtos/address.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { AddressMapper } from '../../infrastructure/address.mapper';

export class GetAddressUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async execute(id: string): Promise<Result<AddressDto, HttpError>> {
    const address = await this.addressRepository.findById(id);

    if (!address) {
      return failure(HttpError.notFound('Address not found.'));
    }

    const addressDto = AddressMapper.toDto(address);
    return success(addressDto);
  }
}