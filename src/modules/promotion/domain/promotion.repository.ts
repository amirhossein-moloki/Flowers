import { Promotion } from './promotion.entity';

export interface IPromotionRepository {
  findById(id: string): Promise<Promotion | null>;
  findByCode(code: string): Promise<Promotion | null>;
  save(promotion: Promotion): Promise<void>;
  delete(id: string): Promise<void>;
}