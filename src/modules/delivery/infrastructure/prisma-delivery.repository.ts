import { IDeliveryRepository } from '../domain/delivery.repository';
import { Delivery } from '../domain/delivery.entity';
import prisma from '../../../infrastructure/database/prisma/prisma-client';
import { DeliveryMapper } from './delivery.mapper';

export class PrismaDeliveryRepository implements IDeliveryRepository {
  async findById(id: string): Promise<Delivery | null> {
    const delivery = await prisma.delivery.findUnique({ where: { id } });
    return delivery ? DeliveryMapper.toDomain(delivery) : null;
  }

  async findByOrderId(order_id: string): Promise<Delivery | null> {
    const delivery = await prisma.delivery.findUnique({ where: { order_id } });
    return delivery ? DeliveryMapper.toDomain(delivery) : null;
  }

  async save(delivery: Delivery): Promise<void> {
    const data = DeliveryMapper.toPersistence(delivery);
    await prisma.delivery.upsert({
      where: { id: delivery.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.delivery.delete({ where: { id } });
  }
}