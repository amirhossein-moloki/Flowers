import { IAddressRepository } from '../../domain/address.repository';
import { Address } from '../../domain/address.entity';
import { CreateAddressDto } from '../dtos/create-address.dto';
import { AddressDto } from '../dtos/address.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { AddressMapper } from '../../infrastructure/address.mapper';

export class CreateAddressUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async execute(dto: CreateAddressDto): Promise<Result<AddressDto, HttpError>> {
    const addressResult = Address.create(dto);

    if (!addressResult.success) {
      return failure(HttpError.internalServerError(addressResult.error.message));
    }

    const address = addressResult.value;

    await this.addressRepository.save(address);

    const addressDto = AddressMapper.toDto(address);
    return success(addressDto);
  }
}