import { ICustomerAddressRepository } from '../../domain/customer-address.repository';
import { CustomerAddressDto } from '../dtos/customer-address.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { CustomerAddressMapper } from '../../infrastructure/customer-address.mapper';

export class GetCustomerAddressUseCase {
  constructor(private readonly customerAddressRepository: ICustomerAddressRepository) {}

  async execute(id: string): Promise<Result<CustomerAddressDto, HttpError>> {
    const customerAddress = await this.customerAddressRepository.findById(id);

    if (!customerAddress) {
      return failure(HttpError.notFound('CustomerAddress not found.'));
    }

    const customerAddressDto = CustomerAddressMapper.toDto(customerAddress);
    return success(customerAddressDto);
  }
}