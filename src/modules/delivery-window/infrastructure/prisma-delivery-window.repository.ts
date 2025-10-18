import { PrismaClient } from '@prisma/client';
import { IDeliveryWindowRepository } from '../domain/delivery-window.repository';
import { DeliveryWindow } from '../domain/delivery-window.entity';
import { DeliveryWindowMapper } from './delivery-window.mapper';

export class PrismaDeliveryWindowRepository implements IDeliveryWindowRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<DeliveryWindow | null> {
    const deliveryWindow = await this.prisma.deliveryWindow.findUnique({
      where: { id },
    });
    return deliveryWindow ? DeliveryWindowMapper.toDomain(deliveryWindow) : null;
  }

  async findAll(): Promise<DeliveryWindow[]> {
    const deliveryWindows = await this.prisma.deliveryWindow.findMany();
    return deliveryWindows.map(DeliveryWindowMapper.toDomain);
  }

  async save(deliveryWindow: DeliveryWindow): Promise<void> {
    const data = DeliveryWindowMapper.toPersistence(deliveryWindow);
    const { id, ...updateData } = data;
    await this.prisma.deliveryWindow.upsert({
      where: { id: deliveryWindow.id },
      update: updateData,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.deliveryWindow.delete({ where: { id } });
  }
}
