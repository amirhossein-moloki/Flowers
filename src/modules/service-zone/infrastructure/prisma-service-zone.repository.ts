import { IServiceZoneRepository } from '../domain/service-zone.repository';
import { ServiceZone } from '../domain/service-zone.entity';
import { PrismaClient } from '@prisma/client';
import { ServiceZoneMapper } from './service-zone.mapper';

export class PrismaServiceZoneRepository implements IServiceZoneRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<ServiceZone | null> {
    const serviceZone = await this.prisma.serviceZone.findUnique({ where: { id } });
    return serviceZone ? ServiceZoneMapper.toDomain(serviceZone) : null;
  }

  async findAll(): Promise<ServiceZone[]> {
    const serviceZones = await this.prisma.serviceZone.findMany();
    return serviceZones.map(ServiceZoneMapper.toDomain);
  }

  async save(serviceZone: ServiceZone): Promise<void> {
    const data = ServiceZoneMapper.toPersistence(serviceZone);
    await this.prisma.serviceZone.upsert({
      where: { id: serviceZone.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.serviceZone.delete({ where: { id } });
  }
}
