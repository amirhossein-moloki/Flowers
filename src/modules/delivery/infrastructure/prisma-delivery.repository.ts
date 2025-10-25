import { IDeliveryRepository } from '@/modules/delivery/domain/delivery.repository.interface';
import { Delivery } from '@/modules/delivery/domain/delivery.entity';
import { PrismaClient } from '@prisma/client';
import { DeliveryMapper } from '@/modules/delivery/infrastructure/delivery.mapper';

export class PrismaDeliveryRepository implements IDeliveryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Delivery | null> {
    const delivery = await this.prisma.delivery.findUnique({ where: { id } });
    return delivery ? DeliveryMapper.toDomain(delivery) : null;
  }

  async findByOrderId(orderId: string): Promise<Delivery | null> {
    const delivery = await this.prisma.delivery.findUnique({ where: { order_id: orderId } });
    return delivery ? DeliveryMapper.toDomain(delivery) : null;
  }

  async findAll(page: number, pageSize: number): Promise<Delivery[]> {
    const deliveries = await this.prisma.delivery.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return deliveries.map(DeliveryMapper.toDomain);
  }

  async save(delivery: Delivery): Promise<void> {
    const data = DeliveryMapper.toPersistence(delivery);
    const { id, ...updateData } = data;
    await this.prisma.delivery.upsert({
      where: { id: delivery.id },
      update: updateData,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.delivery.delete({ where: { id } });
  }
}
