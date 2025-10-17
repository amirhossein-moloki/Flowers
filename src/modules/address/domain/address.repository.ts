import { IRepository } from '../../../../core/domain/repository';
import { Address } from './address.entity';

export interface IAddressRepository extends IRepository<Address> {
  findById(id: string): Promise<Address | null>;
  findAll(page: number, pageSize: number): Promise<Address[]>;
  save(address: Address): Promise<void>;
  delete(id: string): Promise<void>;
}