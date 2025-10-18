import { DriverLocation as PrismaDriverLocation } from '@prisma/client';
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

  static toDomain(
    prismaDriverLocation: PrismaDriverLocation,
  ): DriverLocation {
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

  static toPersistence(
    driverLocation: DriverLocation,
  ): Omit<PrismaDriverLocation, 'createdAt' | 'updatedAt'> {
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