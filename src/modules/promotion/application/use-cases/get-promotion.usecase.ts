import { IPromotionRepository } from '@/modules/promotion/domain/promotion.repository';
import { Promotion } from '@/modules/promotion/domain/promotion.entity';
import { Result } from '@/core/utils/result';

type GetPromotionRequest = {
  id: string;
};

export class GetPromotionUseCase {
  constructor(private promotionRepository: IPromotionRepository) {}

  async execute(request: GetPromotionRequest): Promise<Result<Promotion, Error>> {
    return this.promotionRepository.findById(request.id);
  }
}
