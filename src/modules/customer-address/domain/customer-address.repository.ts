import { CustomerAddress } from './customer-address.entity';

export interface ICustomerAddressRepository {
  findById(id: string): Promise<CustomerAddress | null>;
  findAll(): Promise<CustomerAddress[]>;
  save(customerAddress: CustomerAddress): Promise<void>;
  delete(id: string): Promise<void>;
}