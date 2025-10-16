import { IOrderRepository } from '../domain/order.repository';
import { Order } from '../domain/order.entity';
import prisma from '../../../infrastructure/database/prisma/prisma-client';
import { OrderMapper } from './order.mapper';

export class PrismaOrderRepository implements IOrderRepository {
  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    return order ? OrderMapper.toDomain(order) : null;
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });
    return orders.map(OrderMapper.toDomain);
  }

  async save(order: Order): Promise<void> {
    const data = OrderMapper.toPersistence(order);
    const { items, ...orderData } = data;

    await prisma.order.upsert({
      where: { id: order.id },
      update: orderData,
      create: orderData,
    });

    // This is a simplified save. A real implementation would handle item updates.
    await prisma.orderItem.deleteMany({ where: { orderId: order.id } });
    await prisma.orderItem.createMany({
      data: items.map((item) => ({ ...item, orderId: order.id })),
    });
  }
}