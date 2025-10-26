import { ServiceZone as PrismaServiceZone, Prisma } from '@prisma/client';
import { ServiceZone } from '../domain/service-zone.entity';

export class ServiceZoneMapper {
  static toDomain(
    prismaServiceZone: PrismaServiceZone,
  ): ServiceZone {
    const serviceZoneResult = ServiceZone.create(
      {
        name: prismaServiceZone.name,
        geo_json: prismaServiceZone.geo_json,
        is_active: prismaServiceZone.is_active,
      },
      prismaServiceZone.id,
    );
    if (!serviceZoneResult.success) {
      throw new Error('Could not map PrismaServiceZone to domain');
    }
    return serviceZoneResult.value;
  }

  static toPersistence(
    serviceZone: ServiceZone,
  ): Prisma.ServiceZoneCreateInput {
    return {
      id: serviceZone.id,
      name: serviceZone.name,
      geo_json: serviceZone.geo_json,
      is_active: serviceZone.is_active,
    };
  }
}