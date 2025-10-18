import { Delivery } from '@/modules/delivery/domain/delivery.entity';

export class DeliveryPresenter {
  static toJSON(delivery: Delivery) {
    return {
      id: delivery.id,
      order_id: delivery.order_id,
      courier_id: delivery.courier_id,
      status_id: delivery.status_id,
      vehicle_type: delivery.vehicle_type,
      assigned_at: delivery.assigned_at,
      pickup_at: delivery.pickup_at,
      dropoff_at: delivery.dropoff_at,
      distance_meters: delivery.distance_meters,
      eta_seconds: delivery.eta_seconds,
      failure_reason: delivery.failure_reason,
      created_at: delivery.props.created_at,
      updated_at: delivery.props.updated_at,
    };
  }
}