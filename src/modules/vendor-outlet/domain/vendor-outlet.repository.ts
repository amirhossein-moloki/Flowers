import { VendorOutlet } from './vendor-outlet.entity';

export interface IVendorOutletRepository {
  findById(id: string): Promise<VendorOutlet | null>;
  findByVendorId(vendorId: string): Promise<VendorOutlet[]>;
  findAll(): Promise<VendorOutlet[]>;
  save(vendorOutlet: VendorOutlet): Promise<VendorOutlet>;
  delete(id: string): Promise<boolean>;
}