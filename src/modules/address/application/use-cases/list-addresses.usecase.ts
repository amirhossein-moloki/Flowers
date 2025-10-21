import { UseCase } from '@/core/application/use-case';
import { Result, success } from '@/core/utils/result';
import { Address } from '../../domain/address.entity';
import { IAddressRepository } from '../../domain/address.repository.interface';

export class ListAddressesUseCase implements UseCase<void, Address[]> {
    constructor(private readonly addressRepository: IAddressRepository) {}

  async execute(): Promise<Result<Address[], Error>> {
    const addresses = await this.addressRepository.findAll();
    return success(addresses);
  }
}
