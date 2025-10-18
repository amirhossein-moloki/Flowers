import { OrderPromotion } from './order-promotion.entity';

export interface IOrderPromotionRepository {
  findById(id: string): Promise<OrderPromotion | null>;
  findByOrderId(orderId: string): Promise<OrderPromotion[]>;
  save(orderPromotion: OrderPromotion): Promise<void>;
  delete(id: string): Promise<void>;
}