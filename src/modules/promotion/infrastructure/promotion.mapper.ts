import { Promotion } from '../domain/promotion.entity';
import { PromotionDto } from '../application/dtos/promotion.dto';

export class PromotionMapper {
  static toDto(promotion: Promotion): PromotionDto {
    return {
      id: promotion.id,
      code: promotion.code,
      type: promotion.type,
      amount: promotion.amount,
      percent: promotion.percent,
      starts_at: promotion.starts_at,
      ends_at: promotion.ends_at,
      usage_limit: promotion.usage_limit,
      is_active: promotion.is_active,
    };
  }

  static toDomain(dto: PromotionDto): Promotion {
    const result = Promotion.create({
      code: dto.code,
      type: dto.type,
      amount: dto.amount,
      percent: dto.percent,
      starts_at: dto.starts_at,
      ends_at: dto.ends_at,
      usage_limit: dto.usage_limit,
      is_active: dto.is_active,
    }, dto.id);

    if (result.success) {
      return result.value;
    } else {
      throw result.error;
    }
  }

  static toPersistence(promotion: Promotion): any {
    return {
      id: promotion.id,
      code: promotion.code,
      type: promotion.type,
      amount: promotion.amount,
      percent: promotion.percent,
      starts_at: promotion.starts_at,
      ends_at: promotion.ends_at,
      usage_limit: promotion.usage_limit,
      is_active: promotion.is_active,
    };
  }
}