import { Delivery } from '../domain/delivery.entity';
import { DeliveryDto } from '../application/dtos/delivery.dto';

export class DeliveryMapper {
  static toDto(delivery: Delivery): DeliveryDto {
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

  static toDomain(dto: DeliveryDto): Delivery {
    const result = Delivery.create({
      order_id: dto.order_id,
      courier_id: dto.courier_id,
      status_id: dto.status_id,
      vehicle_type: dto.vehicle_type,
      assigned_at: dto.assigned_at,
      pickup_at: dto.pickup_at,
      dropoff_at: dto.dropoff_at,
      distance_meters: dto.distance_meters,
      eta_seconds: dto.eta_seconds,
      failure_reason: dto.failure_reason,
    }, dto.id);

    if (result.success) {
      return result.value;
    } else {
      throw result.error;
    }
  }

  static toPersistence(delivery: Delivery): any {
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
}