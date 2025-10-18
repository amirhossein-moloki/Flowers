import { Delivery as PrismaDelivery } from '@prisma/client';
import { Delivery } from '../domain/delivery.entity';
import { DeliveryDto } from '../application/dtos/delivery.dto';
import { VehicleType } from '../../../core/domain/enums';

export class DeliveryMapper {
  public static toDomain(raw: PrismaDelivery): Delivery {
    const deliveryResult = Delivery.create(
      {
        order_id: raw.order_id,
        courier_id: raw.courier_id,
        status_id: raw.status_id,
        vehicle_type: raw.vehicle_type as VehicleType,
        assigned_at: raw.assigned_at,
        pickup_at: raw.pickup_at,
        dropoff_at: raw.dropoff_at,
        distance_meters: raw.distance_meters,
        eta_seconds: raw.eta_seconds,
        failure_reason: raw.failure_reason,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
      },
      raw.id,
    );

    if (!deliveryResult.success) {
      throw new Error(`Failed to map raw data to Delivery entity: ${deliveryResult.error.message}`);
    }
    return deliveryResult.value;
  }

  public static toPersistence(delivery: Delivery) {
    const props = delivery.props;
    return {
      id: delivery.id,
      order_id: props.order_id,
      courier_id: props.courier_id,
      status_id: props.status_id,
      vehicle_type: props.vehicle_type,
      assigned_at: props.assigned_at,
      pickup_at: props.pickup_at,
      dropoff_at: props.dropoff_at,
      distance_meters: props.distance_meters,
      eta_seconds: props.eta_seconds,
      failure_reason: props.failure_reason,
    };
  }

  public static toDto(delivery: Delivery): DeliveryDto {
    const props = delivery.props;
    return {
      id: delivery.id,
      order_id: props.order_id,
      courier_id: props.courier_id,
      status_id: props.status_id,
      vehicle_type: props.vehicle_type,
      assigned_at: props.assigned_at,
      pickup_at: props.pickup_at,
      dropoff_at: props.dropoff_at,
      distance_meters: props.distance_meters,
      eta_seconds: props.eta_seconds,
      failure_reason: props.failure_reason,
      created_at: props.created_at,
    };
  }
}