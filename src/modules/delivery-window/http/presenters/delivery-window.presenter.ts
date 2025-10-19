import { DeliveryWindow } from '@/modules/delivery-window/domain/delivery-window.entity';
import { DeliveryWindowDto } from '../../application/dtos/delivery-window.dto';

export class DeliveryWindowPresenter {
  static toJSON(deliveryWindow: DeliveryWindow): DeliveryWindowDto {
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

  static toJSONList(deliveryWindows: DeliveryWindow[]): DeliveryWindowDto[] {
    return deliveryWindows.map(DeliveryWindowPresenter.toJSON);
  }
}