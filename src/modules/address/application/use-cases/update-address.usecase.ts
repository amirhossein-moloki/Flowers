import { IAddressRepository } from '../../domain/address.repository';
import { UpdateAddressDto } from '../dtos/update-address.dto';
import { AddressDto } from '../dtos/address.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { AddressMapper } from '../../infrastructure/address.mapper';
import { Address } from '../../domain/address.entity';

export class UpdateAddressUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async execute(dto: UpdateAddressDto & { id: string }): Promise<Result<AddressDto, HttpError>> {
    const address = await this.addressRepository.findById(dto.id);

    if (!address) {
      return failure(HttpError.notFound('Address not found.'));
    }

    const updatedAddressProps = { ...address.props, ...dto };
    const updatedAddressResult = Address.create(updatedAddressProps, address.id);

    if(!updatedAddressResult.success){
        return failure(HttpError.badRequest(updatedAddressResult.error.message));
    }

    const updatedAddress = updatedAddressResult.value;

    await this.addressRepository.save(updatedAddress);

    const addressDto = AddressMapper.toDto(updatedAddress);
    return success(addressDto);
  }
}