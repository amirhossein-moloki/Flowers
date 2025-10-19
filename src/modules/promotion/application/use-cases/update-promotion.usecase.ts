import { IPromotionRepository } from '@/modules/promotion/domain/promotion.repository';
import { Result, success, failure } from '@/core/utils/result';
import { Promotion } from '@/modules/promotion/domain/promotion.entity';
import { DiscountType } from '@prisma/client';

type UpdatePromotionRequest = {
  id: string;
  code?: string;
  description?: string;
  discount_type?: DiscountType;
  discount_value?: number;
  start_date?: Date;
  end_date?: Date;
  max_uses?: number;
  is_active?: boolean;
};

export class UpdatePromotionUseCase {
  constructor(private promotionRepository: IPromotionRepository) {}

  async execute(request: UpdatePromotionRequest): Promise<Result<Promotion, Error>> {
    const promotionOrError = await this.promotionRepository.findById(request.id);

    if (!promotionOrError.success) {
      return failure(promotionOrError.error);
    }

    const promotion = promotionOrError.value;

    const updatedProps = { ...promotion.props };

    if (request.code) updatedProps.code = request.code;
    if (request.description) updatedProps.description = request.description;
    if (request.discount_type) updatedProps.discount_type = request.discount_type;
    if (request.discount_value) updatedProps.discount_value = request.discount_value;
    if (request.start_date) updatedProps.start_date = request.start_date;
    if (request.end_date) updatedProps.end_date = request.end_date;
    if (request.max_uses) updatedProps.max_uses = request.max_uses;
    if (request.is_active !== undefined) updatedProps.is_active = request.is_active;

    const updatedPromotionOrError = Promotion.create(updatedProps, promotion.id);

    if (!updatedPromotionOrError.success) {
      return failure(updatedPromotionOrError.error);
    }

    const saveResult = await this.promotionRepository.update(updatedPromotionOrError.value);

    if (!saveResult.success) {
      return failure(saveResult.error);
    }

    return success(updatedPromotionOrError.value);
  }
}
