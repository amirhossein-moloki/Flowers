import { ICustomerAddressRepository } from '../../domain/customer-address.repository';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';

export class DeleteCustomerAddressUseCase {
  constructor(private readonly customerAddressRepository: ICustomerAddressRepository) {}

  async execute(id: string): Promise<Result<void, HttpError>> {
    const customerAddress = await this.customerAddressRepository.findById(id);

    if (!customerAddress) {
      return failure(HttpError.notFound('CustomerAddress not found.'));
    }

    await this.customerAddressRepository.delete(id);

    return success(undefined);
  }
}