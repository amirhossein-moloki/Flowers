import { PrismaClient } from '@prisma/client';
import { DriverLocation } from '../domain/driver-location.entity';
import { IDriverLocationRepository } from '../domain/driver-location.repository.interface';
import { DriverLocationMapper } from '../presentation/mappers/driver-location.mapper';

export class PrismaDriverLocationRepository implements IDriverLocationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(driverLocation: DriverLocation): Promise<void> {
    const data = DriverLocationMapper.toPersistence(driverLocation);
    await this.prisma.driverLocation.upsert({
      where: { id: driverLocation.id },
      create: data,
      update: data,
    });
  }

  async findById(id: string): Promise<DriverLocation | null> {
    const found = await this.prisma.driverLocation.findUnique({
      where: { id },
    });
    return found ? DriverLocationMapper.toDomain(found) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.driverLocation.delete({
      where: { id },
    });
  }
}
