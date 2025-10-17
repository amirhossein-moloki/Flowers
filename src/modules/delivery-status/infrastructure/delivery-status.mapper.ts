import { DeliveryStatus } from '../domain/delivery-status.entity';
import { DeliveryStatusDto } from '../application/dtos/delivery-status.dto';

export class DeliveryStatusMapper {
  static toDto(deliveryStatus: DeliveryStatus): DeliveryStatusDto {
    return {
      id: deliveryStatus.id,
      code: deliveryStatus.code,
      name: deliveryStatus.name,
      display_order: deliveryStatus.display_order,
    };
  }

  static toDomain(dto: DeliveryStatusDto): DeliveryStatus {
    const result = DeliveryStatus.create({
      code: dto.code,
      name: dto.name,
      display_order: dto.display_order,
    }, dto.id);

    if (result.success) {
      return result.value;
    } else {
      throw result.error;
    }
  }

  static toPersistence(deliveryStatus: DeliveryStatus): any {
    return {
      id: deliveryStatus.id,
      code: deliveryStatus.code,
      name: deliveryStatus.name,
      display_order: deliveryStatus.display_order,
    };
  }
}