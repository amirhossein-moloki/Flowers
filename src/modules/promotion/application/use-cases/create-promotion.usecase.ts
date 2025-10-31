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

    if (promotionOrError.isFailure()) {
      return failure(promotionOrError.error);
    }

    const promotion = promotionOrError.value;
    const existingPromotionResult = await this.promotionRepository.findByCode(promotion.props.code);

    if (existingPromotionResult.isSuccess()) {
      return failure(new Error('Promotion code already exists'));
    }

    if (existingPromotionResult.isFailure() && !(existingPromotionResult.error instanceof NotFoundError)) {
      return failure(existingPromotionResult.error);
    }

    const saveResult = await this.promotionRepository.save(promotion);

    if (saveResult.isFailure()) {
      return failure(saveResult.error);
    }

    return success(saveResult.value);
  }
}
