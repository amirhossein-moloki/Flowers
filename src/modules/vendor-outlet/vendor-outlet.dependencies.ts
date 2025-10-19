import { CreateVendorOutletUseCase } from './application/use-cases/create-vendor-outlet.usecase';
import { GetVendorOutletUseCase } from './application/use-cases/get-vendor-outlet.usecase';
import { UpdateVendorOutletUseCase } from './application/use-cases/update-vendor-outlet.usecase';
import { DeleteVendorOutletUseCase } from './application/use-cases/delete-vendor-outlet.usecase';
import { ListVendorOutletsUseCase } from './application/use-cases/list-vendor-outlets.usecase';

export interface VendorOutletDependencies {
  createVendorOutletUseCase: CreateVendorOutletUseCase;
  getVendorOutletUseCase: GetVendorOutletUseCase;
  updateVendorOutletUseCase: UpdateVendorOutletUseCase;
  deleteVendorOutletUseCase: DeleteVendorOutletUseCase;
  listVendorOutletsUseCase: ListVendorOutletsUseCase;
}
