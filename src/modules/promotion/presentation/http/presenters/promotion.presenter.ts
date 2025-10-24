import { Promotion } from '@/modules/promotion/domain/promotion.entity';

export class PromotionPresenter {
  static toJSON(promotion: Promotion) {
    return {
      id: promotion.id,
      name: promotion.props.name,
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
