import { CreateCustomerAddressUseCase } from './application/use-cases/create-customer-address.usecase';
import { GetCustomerAddressUseCase } from './application/use-cases/get-customer-address.usecase';
import { UpdateCustomerAddressUseCase } from './application/use-cases/update-customer-address.usecase';
import { DeleteCustomerAddressUseCase } from './application/use-cases/delete-customer-address.usecase';
import { ListCustomerAddressesUseCase } from './application/use-cases/list-customer-addresses.usecase';
import { ICustomerAddressRepository } from './domain/customer-address.repository.interface';

export interface CustomerAddressDependencies {
  createCustomerAddressUseCase: CreateCustomerAddressUseCase;
  getCustomerAddressUseCase: GetCustomerAddressUseCase;
  updateCustomerAddressUseCase: UpdateCustomerAddressUseCase;
  deleteCustomerAddressUseCase: DeleteCustomerAddressUseCase;
  listCustomerAddressesUseCase: ListCustomerAddressesUseCase;
  customerAddressRepository: ICustomerAddressRepository;
}
