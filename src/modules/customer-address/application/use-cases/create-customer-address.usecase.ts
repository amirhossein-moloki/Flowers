import { ICustomerAddressRepository } from '../../domain/customer-address.repository';
import { CustomerAddress } from '../../domain/customer-address.entity';
import { CreateCustomerAddressDto } from '../dtos/create-customer-address.dto';
import { CustomerAddressDto } from '../dtos/customer-address.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { CustomerAddressMapper } from '../../infrastructure/customer-address.mapper';

export class CreateCustomerAddressUseCase {
  constructor(private readonly customerAddressRepository: ICustomerAddressRepository) {}

  async execute(dto: CreateCustomerAddressDto): Promise<Result<CustomerAddressDto, HttpError>> {
    const customerAddressResult = CustomerAddress.create(dto);

    if (!customerAddressResult.success) {
      return failure(HttpError.internalServerError(customerAddressResult.error.message));
    }

    const customerAddress = customerAddressResult.value;

    await this.customerAddressRepository.save(customerAddress);

    const customerAddressDto = CustomerAddressMapper.toDto(customerAddress);
    return success(customerAddressDto);
  }
}