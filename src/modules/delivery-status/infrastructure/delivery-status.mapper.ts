import { DeliveryStatus as PrismaDeliveryStatus } from '@prisma/client';
import { DeliveryStatus } from '../domain/delivery-status.entity';

export class DeliveryStatusMapper {
  static toDomain(
    prismaDeliveryStatus: PrismaDeliveryStatus,
  ): DeliveryStatus {
    const result = DeliveryStatus.create(
      {
        delivery_id: prismaDeliveryStatus.delivery_id,
        status: prismaDeliveryStatus.status,
        notes: prismaDeliveryStatus.notes,
      },
      prismaDeliveryStatus.id,
    );
    if (result.success) {
      return result.value;
    } else {
      throw result.error;
    }
  }

  static toPersistence(
    deliveryStatus: DeliveryStatus,
  ): PrismaDeliveryStatus {
    return {
      id: deliveryStatus.id,
      delivery_id: deliveryStatus.delivery_id,
      status: deliveryStatus.status,
      notes: deliveryStatus.notes,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
