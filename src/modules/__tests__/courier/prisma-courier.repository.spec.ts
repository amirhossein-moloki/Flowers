import { prismaMock } from '../helpers/prisma-mock.helper';
import { PrismaCourierRepository } from '@/modules/courier/infrastructure/prisma-courier.repository';
import { Courier } from '@/modules/courier/domain/courier.entity';
import { CourierMapper } from '@/modules/courier/infrastructure/courier.mapper';

describe('PrismaCourierRepository', () => {
  let repository: PrismaCourierRepository;

  beforeEach(() => {
    repository = new PrismaCourierRepository(prismaMock);
  });

  const courierProps = {
    name: 'Jane Smith',
    phone: '098-765-4321',
    email: 'jane.smith@example.com',
    vehicle: 'Motorcycle',
    isAvailable: true,
  };
  const courierResult = Courier.create(courierProps, 'courier-id-1');
  if (!courierResult.success) {
    throw new Error('Test setup failed: could not create courier entity');
  }
  const courierEntity = courierResult.value;

  const prismaCourier = {
    id: courierEntity.id,
    ...courierProps,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test('findById should return a courier entity when found', async () => {
    prismaMock.courier.findUnique.mockResolvedValue(prismaCourier);

    const foundCourier = await repository.findById('courier-id-1');

    expect(foundCourier).toBeInstanceOf(Courier);
    expect(foundCourier?.id).toBe('courier-id-1');
    expect(prismaMock.courier.findUnique).toHaveBeenCalledWith({ where: { id: 'courier-id-1' } });
  });

  test('findByEmail should return a courier entity when found', async () => {
    prismaMock.courier.findUnique.mockResolvedValue(prismaCourier);

    const foundCourier = await repository.findByEmail(courierProps.email);

    expect(foundCourier).toBeInstanceOf(Courier);
    expect(foundCourier?.email).toBe(courierProps.email);
    expect(prismaMock.courier.findUnique).toHaveBeenCalledWith({ where: { email: courierProps.email } });
  });

  test('save should call upsert on prisma client', async () => {
    await repository.save(courierEntity);

    expect(prismaMock.courier.upsert).toHaveBeenCalledWith({
      where: { id: courierEntity.id },
      create: CourierMapper.toPersistence(courierEntity),
      update: CourierMapper.toPersistence(courierEntity),
    });
  });

  test('delete should call delete on prisma client', async () => {
    await repository.delete('courier-id-1');

    expect(prismaMock.courier.delete).toHaveBeenCalledWith({
      where: { id: 'courier-id-1' },
    });
  });
});