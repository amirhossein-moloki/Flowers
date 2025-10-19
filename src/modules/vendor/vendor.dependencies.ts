import { CreateVendorUseCase } from './application/use-cases/create-vendor.usecase';
import { GetVendorUseCase } from './application/use-cases/get-vendor.usecase';
import { UpdateVendorUseCase } from './application/use-cases/update-vendor.usecase';
import { DeleteVendorUseCase } from './application/use-cases/delete-vendor.usecase';
import { ListVendorsUseCase } from './application/use-cases/list-vendors.usecase';

export interface VendorDependencies {
  createVendorUseCase: CreateVendorUseCase;
  getVendorUseCase: GetVendorUseCase;
  updateVendorUseCase: UpdateVendorUseCase;
  deleteVendorUseCase: DeleteVendorUseCase;
  listVendorsUseCase: ListVendorsUseCase;
}
