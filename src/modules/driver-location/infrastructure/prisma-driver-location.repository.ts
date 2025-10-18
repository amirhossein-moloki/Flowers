import { PrismaClient } from '@prisma/client';
import { IDriverLocationRepository } from '../domain/driver-location.repository';
import { DriverLocation } from '../domain/driver-location.entity';
import { DriverLocationMapper } from './driver-location.mapper';

export class PrismaDriverLocationRepository implements IDriverLocationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<DriverLocation | null> {
    const driverLocation = await this.prisma.driverLocation.findUnique({
      where: { id },
    });
    return driverLocation ? DriverLocationMapper.toDomain(driverLocation) : null;
  }

  async findAll(): Promise<DriverLocation[]> {
    const driverLocations = await this.prisma.driverLocation.findMany();
    return driverLocations.map(DriverLocationMapper.toDomain);
  }

  async save(driverLocation: DriverLocation): Promise<void> {
    const data = DriverLocationMapper.toPersistence(driverLocation);
    await this.prisma.driverLocation.upsert({
      where: { id: driverLocation.id },
      create: data,
      update: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.driverLocation.delete({ where: { id } });
  }
}