import { ServiceZone as PrismaServiceZone, Prisma } from '@prisma/client';
import { ServiceZone } from '../domain/service-zone.entity';

export class ServiceZoneMapper {
  static toDomain(
    prismaServiceZone: PrismaServiceZone,
  ): ServiceZone {
    const serviceZoneResult = ServiceZone.create(
      {
        name: prismaServiceZone.name,
        points: prismaServiceZone.geo_json,
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
  ): Omit<PrismaServiceZone, 'created_at' | 'updated_at'> {
    return {
      id: serviceZone.id,
      name: serviceZone.name,
      geo_json: serviceZone.points,
      is_active: serviceZone.is_active
    };
  }
}