import { PrismaClient } from '@prisma/client';
import { IDeliveryStatusRepository } from '../domain/delivery-status.repository';
import { DeliveryStatus } from '../domain/delivery-status.entity';
import { DeliveryStatusMapper } from './delivery-status.mapper';

export class PrismaDeliveryStatusRepository implements IDeliveryStatusRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<DeliveryStatus | null> {
    const deliveryStatus = await this.prisma.deliveryStatus.findUnique({
      where: { id },
    });
    return deliveryStatus ? DeliveryStatusMapper.toDomain(deliveryStatus) : null;
  }

  async findAll(): Promise<DeliveryStatus[]> {
    const deliveryStatuses = await this.prisma.deliveryStatus.findMany();
    return deliveryStatuses.map(DeliveryStatusMapper.toDomain);
  }

  async save(deliveryStatus: DeliveryStatus): Promise<void> {
    const data = DeliveryStatusMapper.toPersistence(deliveryStatus);
    const { id, ...updateData } = data;
    await this.prisma.deliveryStatus.upsert({
      where: { id: deliveryStatus.id },
      update: updateData,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.deliveryStatus.delete({ where: { id } });
  }
}
