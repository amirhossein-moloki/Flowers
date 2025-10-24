import { Promotion } from './promotion.entity';
import { Result } from '@/core/utils/result';

export interface IPromotionRepository {
  findById(id: string): Promise<Result<Promotion, Error>>;
  findByCode(code: string): Promise<Result<Promotion, Error>>;
  findAll(): Promise<Result<Promotion[], Error>>;
  save(promotion: Promotion): Promise<Result<Promotion, Error>>;
  update(promotion: Promotion): Promise<Result<void, Error>>;
  delete(id: string): Promise<Result<void, Error>>;
}
