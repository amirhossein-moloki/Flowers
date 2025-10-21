import { UseCase } from '@/core/application/use-case';
import { Result, success } from '@/core/utils/result';
import { CustomerAddress } from '../../domain/customer-address.entity';
import { ICustomerAddressRepository } from '../../domain/customer-address.repository.interface';
import { HttpError } from '@/core/errors/http-error';

export class ListCustomerAddressesUseCase implements UseCase<string, CustomerAddress[]> {
    constructor(private readonly customerAddressRepository: ICustomerAddressRepository) {}

  async execute(userId: string): Promise<Result<CustomerAddress[], HttpError>> {
    const customerAddresses = await this.customerAddressRepository.findByUserId(userId);
    return success(customerAddresses);
  }
}
