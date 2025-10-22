import { prismaMock } from './../helpers/prisma-mock.helper';
import { PrismaDriverLocationRepository } from '@/modules/driver-location/infrastructure/prisma-driver-location.repository';
import { DriverLocation } from '@/modules/driver-location/domain/driver-location.entity';
import { PrismaClient } from '@prisma/client';
import { DriverLocationMapper } from '@/modules/driver-location/presentation/mappers/driver-location.mapper';

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
    delivery_id: driverLocationEntity.props.delivery_id,
    courier_id: driverLocationEntity.props.courier_id,
    lat: driverLocationEntity.props.lat,
    lng: driverLocationEntity.props.lng,
    speed_kmh: driverLocationEntity.props.speed_kmh,
    heading_deg: driverLocationEntity.props.heading_deg,
    recorded_at: driverLocationEntity.props.recorded_at,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test('save should call upsert on prisma client', async () => {
    await repository.save(driverLocationEntity);

    expect(prismaMock.driverLocation.upsert).toHaveBeenCalledWith({
      where: { id: driverLocationEntity.id },
      create: DriverLocationMapper.toPersistence(driverLocationEntity),
      update: DriverLocationMapper.toPersistence(driverLocationEntity),
    });
  });

  test('findById should return a driver location entity when found', async () => {
    prismaMock.driverLocation.findUnique.mockResolvedValue(prismaDriverLocation);

    const foundLocation = await repository.findById('dl-id-1');

    expect(foundLocation).toBeInstanceOf(DriverLocation);
    expect(foundLocation?.id).toBe('dl-id-1');
    expect(prismaMock.driverLocation.findUnique).toHaveBeenCalledWith({ where: { id: 'dl-id-1' } });
  });

  test('delete should call delete on prisma client', async () => {
    await repository.delete('dl-id-1');

    expect(prismaMock.driverLocation.delete).toHaveBeenCalledWith({
      where: { id: 'dl-id-1' },
    });
  });
});
