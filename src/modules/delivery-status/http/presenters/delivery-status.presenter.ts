import { DeliveryStatus } from '@/modules/delivery-status/domain/delivery-status.entity';

export class DeliveryStatusPresenter {
  static toJSON(deliveryStatus: DeliveryStatus) {
    return {
      id: deliveryStatus.id,
      code: deliveryStatus.code,
      name: deliveryStatus.name,
      display_order: deliveryStatus.display_order,
      label: `${deliveryStatus.code} - ${deliveryStatus.name}`,
    };
  }
}