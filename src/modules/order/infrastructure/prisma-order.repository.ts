import { IOrderRepository } from '@/modules/order/domain/order.repository';
import { Order } from '@/modules/order/domain/order.entity';
import prisma from '@/infrastructure/database/prisma/prisma-client';
import { OrderMapper } from '@/modules/order/infrastructure/order.mapper';

export class PrismaOrderRepository implements IOrderRepository {
  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    return order ? OrderMapper.toDomain(order) : null;
  }

  async findByUserId(userId: string, page: number, pageSize: number): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    });
    return orders.map(OrderMapper.toDomain);
  }

  async save(order: Order): Promise<void> {
    const { orderData, itemsData } = OrderMapper.toPersistence(order);

    await prisma.$transaction(async (tx) => {
      // Upsert the order itself
      await tx.order.upsert({
        where: { id: order.id },
        update: orderData,
        create: orderData,
      });

      // Delete existing items that are not in the new list
      await tx.orderItem.deleteMany({
        where: {
          orderId: order.id,
          id: { notIn: itemsData.map((item) => item.id) },
        },
      });

      // Upsert all items in the order
      for (const item of itemsData) {
        await tx.orderItem.upsert({
          where: { id: item.id },
          update: item,
          create: item,
        });
      }
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.$transaction(async (tx) => {
      await tx.orderItem.deleteMany({
        where: { orderId: id },
      });
      await tx.order.delete({
        where: { id },
      });
    });
  }
}