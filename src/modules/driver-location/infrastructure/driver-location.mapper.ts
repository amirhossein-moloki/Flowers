import { DriverLocation } from '../domain/driver-location.entity';
import { DriverLocationDto } from '../application/dtos/driver-location.dto';

export class DriverLocationMapper {
  static toDto(driverLocation: DriverLocation): DriverLocationDto {
    return {
      id: driverLocation.id,
      delivery_id: driverLocation.delivery_id,
      courier_id: driverLocation.courier_id,
      lat: driverLocation.lat,
      lng: driverLocation.lng,
      speed_kmh: driverLocation.speed_kmh,
      heading_deg: driverLocation.heading_deg,
      recorded_at: driverLocation.recorded_at,
    };
  }

  static toDomain(dto: DriverLocationDto): DriverLocation {
    const result = DriverLocation.create({
      delivery_id: dto.delivery_id,
      courier_id: dto.courier_id,
      lat: dto.lat,
      lng: dto.lng,
      speed_kmh: dto.speed_kmh,
      heading_deg: dto.heading_deg,
      recorded_at: dto.recorded_at,
    }, dto.id);

    if (result.success) {
      return result.value;
    } else {
      throw result.error;
    }
  }

  static toPersistence(driverLocation: DriverLocation): any {
    return {
      id: driverLocation.id,
      delivery_id: driverLocation.delivery_id,
      courier_id: driverLocation.courier_id,
      lat: driverLocation.lat,
      lng: driverLocation.lng,
      speed_kmh: driverLocation.speed_kmh,
      heading_deg: driverLocation.heading_deg,
      recorded_at: driverLocation.recorded_at,
    };
  }
}