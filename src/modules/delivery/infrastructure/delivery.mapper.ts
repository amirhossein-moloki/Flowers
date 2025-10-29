import { Delivery as PrismaDelivery, VehicleType } from '@prisma/client';
import { Delivery } from '../domain/delivery.entity';

export class DeliveryMapper {
  public static toDomain(raw: PrismaDelivery): Delivery {
    const deliveryResult = Delivery.create(
      {
        order_id: raw.order_id,
        courier_id: raw.courier_id,
        status_id: raw.status_id ?? '',
        assigned_at: raw.assigned_at,
        vehicle_type: raw.vehicle_type,
        pickup_at: raw.delivered_at ?? new Date(),
        dropoff_at: raw.delivered_at ?? new Date(),
        distance_meters: 0,
        eta_seconds: 0,
        failure_reason: '',
        tracking_number: raw.tracking_number,
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
      vehicle_type: props.vehicle_type as unknown as VehicleType,
      assigned_at: props.assigned_at,
      delivered_at: props.dropoff_at,
      expected_delivery_date: props.pickup_at,
      actual_delivery_date: props.dropoff_at,
      tracking_number: props.tracking_number,
    };
  }
}
