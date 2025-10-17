import { IPromotionRepository } from '../../domain/promotion.repository';
import { Promotion } from '../../domain/promotion.entity';
import { CreatePromotionDto } from '../dtos/create-promotion.dto';
import { PromotionDto } from '../dtos/promotion.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { PromotionMapper } from '../../infrastructure/promotion.mapper';

export class CreatePromotionUseCase {
  constructor(private readonly promotionRepository: IPromotionRepository) {}

  async execute(dto: CreatePromotionDto): Promise<Result<PromotionDto, HttpError>> {
    const promotionResult = Promotion.create(dto);

    if (!promotionResult.success) {
      return failure(HttpError.internalServerError(promotionResult.error.message));
    }

    const promotion = promotionResult.value;

    await this.promotionRepository.save(promotion);

    const promotionDto = PromotionMapper.toDto(promotion);
    return success(promotionDto);
  }
}