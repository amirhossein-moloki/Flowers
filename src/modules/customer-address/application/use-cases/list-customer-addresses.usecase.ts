import { UseCase } from '@/core/application/use-case.interface';
import { Result, success } from '@/core/utils/result';
import { CustomerAddress } from '../../domain/customer-address.entity';
import { ICustomerAddressRepository } from '../../domain/customer-address.repository.interface';
import { HttpError } from '@/core/errors/http-error';
import { CustomerAddressDto } from '../dtos/customer-address.dto';
import { CustomerAddressMapper } from '../../infrastructure/customer-address.mapper';

export class ListCustomerAddressesUseCase implements UseCase<string, CustomerAddressDto[]> {
    constructor(private readonly customerAddressRepository: ICustomerAddressRepository) {}

  async execute(userId: string): Promise<Result<CustomerAddressDto[], HttpError>> {
    const customerAddresses = await this.customerAddressRepository.findByUserId(userId);
    const customerAddressesDto = customerAddresses.map(CustomerAddressMapper.toDto);
    return success(customerAddressesDto);
  }
}
