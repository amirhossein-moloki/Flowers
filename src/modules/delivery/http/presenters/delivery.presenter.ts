import { Delivery } from '../domain/delivery.entity';
import { DeliveryDto } from '../application/dtos/delivery.dto';

export class DeliveryPresenter {
  static toJSON(delivery: DeliveryDto) {
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
    };
  }

  static toDto(delivery: Delivery): DeliveryDto {
    return {
      id: delivery.id,
      order_id: delivery.props.order_id,
      courier_id: delivery.props.courier_id,
      status_id: delivery.props.status_id,
      vehicle_type: delivery.props.vehicle_type,
      assigned_at: delivery.props.assigned_at,
      pickup_at: delivery.props.pickup_at,
      dropoff_at: delivery.props.dropoff_at,
      distance_meters: delivery.props.distance_meters,
      eta_seconds: delivery.props.eta_seconds,
      failure_reason: delivery.props.failure_reason,
    };
  }
}
