import { IPromotionRepository } from '@/modules/promotion/domain/promotion.repository';
import { Promotion, IPromotionProps } from '@/modules/promotion/domain/promotion.entity';
import { Result, success, failure } from '@/core/utils/result';
import { NotFoundError } from '@/core/errors/not-found.error';

type CreatePromotionRequest = Omit<IPromotionProps, 'uses_count' | 'is_active'> & {
  is_active?: boolean;
};

export class CreatePromotionUseCase {
  constructor(private promotionRepository: IPromotionRepository) {}

  async execute(request: CreatePromotionRequest): Promise<Result<Promotion, Error>> {
    const promotionOrError = Promotion.create({
      ...request,
      uses_count: 0,
      is_active: request.is_active ?? true,
    });

    if (!promotionOrError.success) {
      return failure(promotionOrError.error);
    }

    const promotion = promotionOrError.value;
    const existingPromotion = await this.promotionRepository.findByCode(promotion.props.code);

    if (existingPromotion.success) {
      return failure(new Error('Promotion code already exists'));
    }

    if (!(existingPromotion.error instanceof NotFoundError)) {
      return failure(existingPromotion.error);
    }

    const saveResult = await this.promotionRepository.save(promotion);

    if (!saveResult.success) {
      return failure(saveResult.error);
    }

    return success(promotion);
  }
}
