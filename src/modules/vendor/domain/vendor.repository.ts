import { Vendor } from './vendor.entity';

export interface IVendorRepository {
  findById(id: string): Promise<Vendor | null>;
  findAll(): Promise<Vendor[]>;
  save(vendor: Vendor): Promise<Vendor>;
  delete(id: string): Promise<boolean>;
}