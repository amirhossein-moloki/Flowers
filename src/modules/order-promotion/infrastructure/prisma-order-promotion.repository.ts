import { IOrderPromotionRepository } from '@/modules/order-promotion/domain/order-promotion.repository';
import { OrderPromotion } from '@/modules/order-promotion/domain/order-promotion.entity';
import prisma from '@/infrastructure/database/prisma/prisma-client';
import { OrderPromotionMapper } from '@/modules/order-promotion/infrastructure/order-promotion.mapper';

export class PrismaOrderPromotionRepository implements IOrderPromotionRepository {
  async findById(id: string): Promise<OrderPromotion | null> {
    const orderPromotion = await prisma.orderPromotion.findUnique({ where: { id: id } });
    return orderPromotion ? OrderPromotionMapper.toDomain(orderPromotion) : null;
  }

  async findByOrderId(orderId: string): Promise<OrderPromotion[]> {
    const orderPromotions = await prisma.orderPromotion.findMany({ where: { order_id: orderId } });
    return orderPromotions.map(OrderPromotionMapper.toDomain);
  }

  async save(orderPromotion: OrderPromotion): Promise<OrderPromotion> {
    const data = OrderPromotionMapper.toPersistence(orderPromotion);
    const savedOrderPromotion = await prisma.orderPromotion.upsert({
      where: { id: orderPromotion.id },
      update: data,
      create: data,
    });
    return OrderPromotionMapper.toDomain(savedOrderPromotion);
  }

  async delete(id: string): Promise<void> {
    await prisma.orderPromotion.delete({ where: { id } });
  }
}