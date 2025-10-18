import { IServiceZoneRepository } from '../domain/service-zone.repository';
import { ServiceZone } from '../domain/service-zone.entity';
import prisma from '../../../infrastructure/database/prisma/prisma-client';
import { ServiceZoneMapper } from './service-zone.mapper';

export class PrismaServiceZoneRepository implements IServiceZoneRepository {
  async findById(id: string): Promise<ServiceZone | null> {
    const serviceZone = await prisma.serviceZone.findUnique({ where: { id } });
    return serviceZone ? ServiceZoneMapper.toDomain(serviceZone) : null;
  }

  async findAll(): Promise<ServiceZone[]> {
    const serviceZones = await prisma.serviceZone.findMany();
    return serviceZones.map(ServiceZoneMapper.toDomain);
  }

  async save(serviceZone: ServiceZone): Promise<void> {
    const data = ServiceZoneMapper.toPersistence(serviceZone);
    await prisma.serviceZone.upsert({
      where: { id: serviceZone.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.serviceZone.delete({ where: { id } });
  }
}