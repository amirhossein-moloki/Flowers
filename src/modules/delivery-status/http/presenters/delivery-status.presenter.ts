import { DeliveryStatus } from '@/modules/delivery-status/domain/delivery-status.entity';

export class DeliveryStatusPresenter {
  static toJSON(deliveryStatus: DeliveryStatus) {
    return {
      id: deliveryStatus.id,
      delivery_id: deliveryStatus.delivery_id,
      status: deliveryStatus.status,
      notes: deliveryStatus.notes,
    };
  }
}
