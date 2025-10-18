import { prismaMock } from '../helpers/prisma-mock.helper';
import { PrismaDriverLocationRepository } from '@/modules/driver-location/infrastructure/prisma-driver-location.repository';
import { DriverLocation } from '@/modules/driver-location/domain/driver-location.entity';
import { DriverLocationMapper } from '@/modules/driver-location/infrastructure/driver-location.mapper';
import { PrismaClient } from '@prisma/client';

describe('PrismaDriverLocationRepository', () => {
  let repository: PrismaDriverLocationRepository;

  beforeEach(() => {
    repository = new PrismaDriverLocationRepository(prismaMock as unknown as PrismaClient);
  });

  const driverLocationProps = {
    delivery_id: 'delivery-123',
    courier_id: 'courier-456',
    lat: 34.0522,
    lng: -118.2437,
    speed_kmh: 60,
    heading_deg: 180,
    recorded_at: new Date(),
  };
  const driverLocationResult = DriverLocation.create(driverLocationProps, 'dl-id-1');
  if (!driverLocationResult.success) {
    throw new Error('Test setup failed: could not create driver location entity');
  }
  const driverLocationEntity = driverLocationResult.value;

  const prismaDriverLocation = {
    id: driverLocationEntity.id,
    ...driverLocationProps,
    created_at: new Date(),
    updated_at: new Date(),
  };

  test('findById should return a driver location entity when found', async () => {
    prismaMock.driverLocation.findUnique.mockResolvedValue(prismaDriverLocation);

    const foundLocation = await repository.findById('dl-id-1');

    expect(foundLocation).toBeInstanceOf(DriverLocation);
    expect(foundLocation?.id).toBe('dl-id-1');
    expect(prismaMock.driverLocation.findUnique).toHaveBeenCalledWith({ where: { id: 'dl-id-1' } });
  });

  test('findAll should return an array of driver location entities', async () => {
    prismaMock.driverLocation.findMany.mockResolvedValue([prismaDriverLocation]);

    const locations = await repository.findAll();

    expect(locations).toHaveLength(1);
    expect(locations[0]).toBeInstanceOf(DriverLocation);
    expect(prismaMock.driverLocation.findMany).toHaveBeenCalledWith();
  });

  test('save should call upsert on prisma client', async () => {
    await repository.save(driverLocationEntity);

    expect(prismaMock.driverLocation.upsert).toHaveBeenCalledWith({
      where: { id: driverLocationEntity.id },
      create: DriverLocationMapper.toPersistence(driverLocationEntity),
      update: DriverLocationMapper.toPersistence(driverLocationEntity),
    });
  });

  test('delete should call delete on prisma client', async () => {
    await repository.delete('dl-id-1');

    expect(prismaMock.driverLocation.delete).toHaveBeenCalledWith({
      where: { id: 'dl-id-1' },
    });
  });
});