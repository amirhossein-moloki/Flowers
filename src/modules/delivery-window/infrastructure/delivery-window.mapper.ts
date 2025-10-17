import { DeliveryWindow } from '../domain/delivery-window.entity';
import { DeliveryWindowDto } from '../application/dtos/delivery-window.dto';

export class DeliveryWindowMapper {
  static toDto(deliveryWindow: DeliveryWindow): DeliveryWindowDto {
    return {
      id: deliveryWindow.id,
      label: deliveryWindow.label,
      start_time: deliveryWindow.start_time,
      end_time: deliveryWindow.end_time,
      cutoff_time: deliveryWindow.cutoff_time,
      zone_id: deliveryWindow.zone_id,
      is_active: deliveryWindow.is_active,
    };
  }

  static toDomain(dto: DeliveryWindowDto): DeliveryWindow {
    const result = DeliveryWindow.create({
      label: dto.label,
      start_time: dto.start_time,
      end_time: dto.end_time,
      cutoff_time: dto.cutoff_time,
      zone_id: dto.zone_id,
      is_active: dto.is_active,
    }, dto.id);

    if (result.success) {
      return result.value;
    } else {
      throw result.error;
    }
  }

  static toPersistence(deliveryWindow: DeliveryWindow): any {
    return {
      id: deliveryWindow.id,
      label: deliveryWindow.label,
      start_time: deliveryWindow.start_time,
      end_time: deliveryWindow.end_time,
      cutoff_time: deliveryWindow.cutoff_time,
      zone_id: deliveryWindow.zone_id,
      is_active: deliveryWindow.is_active,
    };
  }
}