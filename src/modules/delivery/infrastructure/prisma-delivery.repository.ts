import { IDeliveryRepository } from '@/modules/delivery/domain/delivery.repository';
import { Delivery } from '@/modules/delivery/domain/delivery.entity';
import prisma from '@/infrastructure/database/prisma/prisma-client';
import { DeliveryMapper } from '@/modules/delivery/infrastructure/delivery.mapper';

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
    const { id, ...updateData } = data;
    await prisma.delivery.upsert({
      where: { id: delivery.id },
      update: updateData,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.delivery.delete({ where: { id } });
  }
}