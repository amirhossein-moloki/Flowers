import { Promotion as PrismaPromotion } from '@prisma/client';
import { Promotion } from '@/modules/promotion/domain/promotion.entity';
import { Result, success } from '@/core/utils/result';

export class PromotionMapper {
  static toDomain(prismaPromotion: PrismaPromotion): Result<Promotion, Error> {
    const promotionProps = {
      code: prismaPromotion.code,
      description: prismaPromotion.description ?? undefined,
      discount_type: prismaPromotion.discount_type,
      discount_value: prismaPromotion.discount_value,
      start_date: prismaPromotion.start_date,
      end_date: prismaPromotion.end_date ?? undefined,
      max_uses: prismaPromotion.max_uses ?? undefined,
      uses_count: prismaPromotion.uses_count,
      is_active: prismaPromotion.is_active,
    };
    return Promotion.create(promotionProps, prismaPromotion.id);
  }

  static toPersistence(promotion: Promotion) {
    return {
      id: promotion.id,
      code: promotion.props.code,
      description: promotion.props.description,
      discount_type: promotion.props.discount_type,
      discount_value: promotion.props.discount_value,
      start_date: promotion.props.start_date,
      end_date: promotion.props.end_date,
      max_uses: promotion.props.max_uses,
      uses_count: promotion.props.uses_count,
      is_active: promotion.props.is_active,
    };
  }
}
