import { Promotion } from './promotion.entity';

export interface IPromotionRepository {
  findById(id: string): Promise<Promotion | null>;
  findAll(): Promise<Promotion[]>;
  save(promotion: Promotion): Promise<void>;
  delete(id: string): Promise<void>;
}