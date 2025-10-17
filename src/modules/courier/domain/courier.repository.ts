import { Courier } from './courier.entity';

export interface ICourierRepository {
  findById(id: string): Promise<Courier | null>;
  findAll(): Promise<Courier[]>;
  save(courier: Courier): Promise<void>;
  delete(id: string): Promise<void>;
}