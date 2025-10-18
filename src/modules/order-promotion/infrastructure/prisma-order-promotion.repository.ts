import { IOrderPromotionRepository } from '../domain/order-promotion.repository';
import { OrderPromotion } from '../domain/order-promotion.entity';
import prisma from '../../../infrastructure/database/prisma/prisma-client';
import { OrderPromotionMapper } from './order-promotion.mapper';

export class PrismaOrderPromotionRepository implements IOrderPromotionRepository {
  async findById(id: string): Promise<OrderPromotion | null> {
    const orderPromotion = await prisma.orderPromotion.findUnique({ where: { id } });
    return orderPromotion ? OrderPromotionMapper.toDomain(orderPromotion) : null;
  }

  async findByOrderId(orderId: string): Promise<OrderPromotion[]> {
    const orderPromotions = await prisma.orderPromotion.findMany({ where: { order_id: orderId } });
    return orderPromotions.map(OrderPromotionMapper.toDomain);
  }

  async save(orderPromotion: OrderPromotion): Promise<void> {
    const data = OrderPromotionMapper.toPersistence(orderPromotion);
    await prisma.orderPromotion.upsert({
      where: { id: orderPromotion.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.orderPromotion.delete({ where: { id } });
  }
}