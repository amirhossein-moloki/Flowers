import { Vendor } from './vendor.entity';

export interface IVendorRepository {
  findById(id: string): Promise<Vendor | null>;
  findByEmail(email: string): Promise<Vendor | null>;
  findByPhone(phone: string): Promise<Vendor | null>;
  findAll(): Promise<Vendor[]>;
  save(vendor: Vendor): Promise<Vendor>;
  update(vendor: Vendor): Promise<Vendor>;
  delete(id: string): Promise<boolean>;
}