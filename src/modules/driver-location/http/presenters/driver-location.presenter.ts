import { DriverLocation } from '../../domain/driver-location.entity';

export class DriverLocationPresenter {
  static toJSON(entity: DriverLocation) {
    return {
      id: entity.id,
      delivery_id: entity.props.delivery_id,
      courier_id: entity.props.courier_id,
      lat: entity.props.lat,
      lng: entity.props.lng,
      speed_kmh: entity.props.speed_kmh,
      heading_deg: entity.props.heading_deg,
      recorded_at: entity.props.recorded_at.toISOString(),
    };
  }
}
