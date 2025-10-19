import { IPromotionRepository } from '@/modules/promotion/domain/promotion.repository';
import { Result } from '@/core/utils/result';
import { Promotion } from '@/modules/promotion/domain/promotion.entity';

export class GetAllPromotionsUseCase {
  constructor(private promotionRepository: IPromotionRepository) {}

  async execute(): Promise<Result<Promotion[], Error>> {
    return this.promotionRepository.findAll();
  }
}
