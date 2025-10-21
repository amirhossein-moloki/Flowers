import { ServiceZone as PrismaServiceZone, Prisma } from '@prisma/client';
import { ServiceZone } from '../domain/service-zone.entity';

export class ServiceZoneMapper {
  static toDomain(
    prismaServiceZone: PrismaServiceZone,
  ): ServiceZone {
    const serviceZoneResult = ServiceZone.create(
      {
        name: prismaServiceZone.name,
        city: prismaServiceZone.city,
        polygon_geojson: prismaServiceZone.polygon_geojson,
        is_active: prismaServiceZone.is_active,
      },
      prismaServiceZone.id,
    );
    if (serviceZoneResult.isFailure) {
      throw new Error('Could not map PrismaServiceZone to domain');
    }
    return serviceZoneResult.value;
  }

  static toPersistence(
    serviceZone: ServiceZone,
  ): PrismaServiceZone {
    return {
      id: serviceZone.id,
      name: serviceZone.name,
      city: serviceZone.city,
      polygon_geojson: serviceZone.polygon_geojson as Prisma.JsonValue,
      is_active: serviceZone.is_active,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}