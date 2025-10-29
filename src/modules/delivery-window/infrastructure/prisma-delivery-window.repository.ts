import { PrismaClient } from '@prisma/client';
import { IDeliveryWindowRepository } from '../domain/delivery-window.repository';
import { DeliveryWindow } from '../domain/delivery-window.entity';
import { DeliveryWindowMapper } from '../presentation/mappers/delivery-window.mapper';

export class PrismaDeliveryWindowRepository implements IDeliveryWindowRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(deliveryWindow: DeliveryWindow): Promise<void> {
    const data = DeliveryWindowMapper.toPersistence(deliveryWindow);
    await this.prisma.deliveryWindow.upsert({
      where: { id: deliveryWindow.id },
      create: data,
      update: data,
    });
  }

  async findById(id: string): Promise<DeliveryWindow | null> {
    const deliveryWindow = await this.prisma.deliveryWindow.findUnique({
      where: { id },
    });

    if (!deliveryWindow) {
      return null;
    }

    return DeliveryWindowMapper.toDomain(deliveryWindow);
  }

  async findAll(): Promise<DeliveryWindow[]> {
    const deliveryWindows = await this.prisma.deliveryWindow.findMany();
    return deliveryWindows.map(DeliveryWindowMapper.toDomain);
  }

  async update(deliveryWindow: DeliveryWindow): Promise<DeliveryWindow> {
    const data = DeliveryWindowMapper.toPersistence(deliveryWindow);
    const updated = await this.prisma.deliveryWindow.update({
      where: { id: deliveryWindow.id },
      data,
    });
    return DeliveryWindowMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.deliveryWindow.delete({
      where: { id },
    });
  }
}
