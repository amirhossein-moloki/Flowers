import { IRepository } from '../../../../core/domain/repository';
import { Courier } from './courier.entity';

export interface ICourierRepository extends IRepository<Courier> {
  findById(id: string): Promise<Courier | null>;
  findByEmail(email: string): Promise<Courier | null>;
  findAll(page: number, pageSize: number): Promise<Courier[]>;
  save(courier: Courier): Promise<void>;
  delete(id: string): Promise<void>;
}