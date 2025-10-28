import { DriverLocation } from '../../domain/driver-location.entity';
import { DriverLocationDto } from '../../application/dtos/driver-location.dto';
import { DriverLocation as PrismaDriverLocation } from '@prisma/client';

export class DriverLocationMapper {
  static toDto(driverLocation: DriverLocation): DriverLocationDto {
    return {
      id: driverLocation.id,
      delivery_id: driverLocation.props.delivery_id,
      courier_id: driverLocation.props.courier_id,
      lat: driverLocation.props.lat,
      lng: driverLocation.props.lng,
      speed_kmh: driverLocation.props.speed_kmh,
      heading_deg: driverLocation.props.heading_deg,
      recorded_at: driverLocation.props.recorded_at,
    };
  }

  static toDomain(prismaDriverLocation: PrismaDriverLocation): DriverLocation {
    const result = DriverLocation.create(
      {
        delivery_id: prismaDriverLocation.delivery_id,
        courier_id: prismaDriverLocation.courier_id,
        lat: prismaDriverLocation.lat,
        lng: prismaDriverLocation.lng,
        speed_kmh: prismaDriverLocation.speed_kmh,
        heading_deg: prismaDriverLocation.heading_deg,
        recorded_at: prismaDriverLocation.recorded_at,
      },
      prismaDriverLocation.id,
    );

    if (result.success) {
      return result.value;
    } else {
      throw result.error;
    }
  }

  static toPersistence(driverLocation: DriverLocation) {
    return {
      id: driverLocation.id,
      delivery_id: driverLocation.props.delivery_id,
      courier_id: driverLocation.props.courier_id,
      lat: driverLocation.props.lat,
      lng: driverLocation.props.lng,
      speed_kmh: driverLocation.props.speed_kmh,
      heading_deg: driverLocation.props.heading_deg,
      recorded_at: driverLocation.props.recorded_at,
    };
  }
}
