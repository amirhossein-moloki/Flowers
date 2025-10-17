import { Vendor } from './vendor.entity';

export interface IVendorRepository {
  findById(id: string): Promise<Vendor | null>;
  // Add other necessary methods like save, update, etc.
}