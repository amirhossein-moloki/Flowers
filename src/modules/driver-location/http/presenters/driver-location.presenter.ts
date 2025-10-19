import { DriverLocation } from '../../domain/driver-location.entity';

export class DriverLocationPresenter {
  static toJSON(entity: DriverLocation) {
    return {
      id: entity.id,
      delivery_id: entity.delivery_id,
      courier_id: entity.courier_id,
      lat: entity.lat,
      lng: entity.lng,
      speed_kmh: entity.speed_kmh,
      heading_deg: entity.heading_deg,
      recorded_at: entity.recorded_at.toISOString(),
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}
