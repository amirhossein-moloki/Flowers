import { Promotion as PrismaPromotion, DiscountType } from '@prisma/client';
import { Promotion } from '@/modules/promotion/domain/promotion.entity';
import { Result } from '@/core/utils/result';

export class PromotionMapper {
  public static toDomain(raw: PrismaPromotion): Result<Promotion, Error> {
    return Promotion.create(
      {
        name: raw.name,
        code: raw.code,
        description: raw.description ?? undefined,
        discount_type: raw.discount_type,
        discount_value: raw.discount_value,
        start_date: raw.start_date,
        end_date: raw.end_date ?? undefined,
        max_uses: raw.max_uses ?? undefined,
        uses_count: raw.uses_count,
        is_active: raw.is_active,
      },
      raw.id,
    );
  }

  public static toPersistence(promotion: Promotion) {
    const props = promotion.props;
    return {
      id: promotion.id,
      name: props.name,
      code: props.code,
      description: props.description,
      discount_type: props.discount_type,
      discount_value: props.discount_value,
      start_date: props.start_date,
      end_date: props.end_date,
      max_uses: props.max_uses,
      uses_count: props.uses_count,
      is_active: props.is_active,
    };
  }
}
