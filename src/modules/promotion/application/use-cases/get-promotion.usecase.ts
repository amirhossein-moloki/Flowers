import { IPromotionRepository } from '../../domain/promotion.repository';
import { PromotionDto } from '../dtos/promotion.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { PromotionMapper } from '../../infrastructure/promotion.mapper';

export class GetPromotionUseCase {
  constructor(private readonly promotionRepository: IPromotionRepository) {}

  async execute(id: string): Promise<Result<PromotionDto, HttpError>> {
    const promotion = await this.promotionRepository.findById(id);

    if (!promotion) {
      return failure(HttpError.notFound('Promotion not found.'));
    }

    const promotionDto = PromotionMapper.toDto(promotion);
    return success(promotionDto);
  }
}