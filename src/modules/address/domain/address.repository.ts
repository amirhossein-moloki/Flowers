import { Address } from './address.entity';

export interface IAddressRepository {
  findById(id: string): Promise<Address | null>;
  findAll(): Promise<Address[]>;
  save(address: Address): Promise<void>;
  delete(id: string): Promise<void>;
}