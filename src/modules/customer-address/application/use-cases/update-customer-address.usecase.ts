import { ICustomerAddressRepository } from '../../domain/customer-address.repository';
import { UpdateCustomerAddressDto } from '../dtos/update-customer-address.dto';
import { CustomerAddressDto } from '../dtos/customer-address.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { CustomerAddressMapper } from '../../infrastructure/customer-address.mapper';
import { CustomerAddress } from '../../domain/customer-address.entity';

export class UpdateCustomerAddressUseCase {
  constructor(private readonly customerAddressRepository: ICustomerAddressRepository) {}

  async execute(dto: UpdateCustomerAddressDto & { id: string }): Promise<Result<CustomerAddressDto, HttpError>> {
    const customerAddress = await this.customerAddressRepository.findById(dto.id);

    if (!customerAddress) {
      return failure(HttpError.notFound('CustomerAddress not found.'));
    }

    const updatedCustomerAddressProps = { ...customerAddress.props, ...dto };
    const updatedCustomerAddressResult = CustomerAddress.create(updatedCustomerAddressProps, customerAddress.id);

    if(!updatedCustomerAddressResult.success){
        return failure(HttpError.badRequest(updatedCustomerAddressResult.error.message));
    }

    const updatedCustomerAddress = updatedCustomerAddressResult.value;

    await this.customerAddressRepository.save(updatedCustomerAddress);

    const newCustomerAddress = await this.customerAddressRepository.findById(updatedCustomerAddress.id);

    const customerAddressDto = CustomerAddressMapper.toDto(newCustomerAddress);
    return success(customerAddressDto);
  }
}