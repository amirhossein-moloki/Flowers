import { IAddressRepository } from '../../domain/address.repository';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';

export class DeleteAddressUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async execute(id: string): Promise<Result<void, HttpError>> {
    const address = await this.addressRepository.findById(id);

    if (!address) {
      return failure(HttpError.notFound('Address not found.'));
    }

    await this.addressRepository.delete(id);

    return success(undefined);
  }
}