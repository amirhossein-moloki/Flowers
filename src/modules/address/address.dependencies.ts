import { CreateAddressUseCase } from './application/use-cases/create-address.usecase';
import { GetAddressUseCase } from './application/use-cases/get-address.usecase';
import { UpdateAddressUseCase } from './application/use-cases/update-address.usecase';
import { DeleteAddressUseCase } from './application/use-cases/delete-address.usecase';
import { ListAddressesUseCase } from './application/use-cases/list-addresses.usecase';

export interface AddressDependencies {
  createAddressUseCase: CreateAddressUseCase;
  getAddressUseCase: GetAddressUseCase;
  updateAddressUseCase: UpdateAddressUseCase;
  deleteAddressUseCase: DeleteAddressUseCase;
  listAddressesUseCase: ListAddressesUseCase;
}
