import { prismaMock } from '@/modules/__tests__/helpers/prisma-mock.helper';
import { PrismaDeliveryRepository } from '@/modules/delivery/infrastructure/prisma-delivery.repository';
import { Delivery } from '@/modules/delivery/domain/delivery.entity';
import { DeliveryMapper } from '@/modules/delivery/infrastructure/delivery.mapper';
import { VehicleType } from '@prisma/client';
import { VehicleType as DomainVehicleType } from '@prisma/client';

describe('PrismaDeliveryRepository', () => {
  let repository: PrismaDeliveryRepository;

  beforeEach(() => {
    repository = new PrismaDeliveryRepository(prismaMock);
  });

  const deliveryProps = {
    order_id: 'order-123',
    courier_id: 'courier-456',
    status_id: 'status-789',
    vehicle_type: DomainVehicleType.MOTORCYCLE,
    assigned_at: new Date(),
    pickup_at: new Date(),
    dropoff_at: new Date(),
    distance_meters: 5000,
    eta_seconds: 1800,
    failure_reason: '',
    tracking_number: 'TRACK-123',
  };
  const deliveryResult = Delivery.create(deliveryProps, 'delivery-id-1');
  if (!deliveryResult.success) {
    throw new Error('Test setup failed: could not create delivery entity');
  }
  const deliveryEntity = deliveryResult.value;

  const prismaDelivery = {
    id: deliveryEntity.id,
    ...deliveryProps,
    created_at: new Date(),
    updated_at: new Date(),
    delivered_at: null,
    expected_delivery_date: new Date(),
    actual_delivery_date: null,
    status_id: 'status-789',
  };

  test('findById should return a delivery entity when found', async () => {
    prismaMock.delivery.findUnique.mockResolvedValue(prismaDelivery);

    const foundDelivery = await repository.findById('delivery-id-1');

    expect(foundDelivery).toBeInstanceOf(Delivery);
    expect(foundDelivery?.id).toBe('delivery-id-1');
    expect(prismaMock.delivery.findUnique).toHaveBeenCalledWith({ where: { id: 'delivery-id-1' } });
  });

  test('findByOrderId should return a delivery entity when found', async () => {
    prismaMock.delivery.findUnique.mockResolvedValue(prismaDelivery);

    const foundDelivery = await repository.findByOrderId('order-123');

    expect(foundDelivery).toBeInstanceOf(Delivery);
    expect(foundDelivery?.order_id).toBe('order-123');
    expect(prismaMock.delivery.findUnique).toHaveBeenCalledWith({ where: { order_id: 'order-123' } });
  });

  test('save should call upsert on prisma client', async () => {
    await repository.save(deliveryEntity);
    const persistenceData = DeliveryMapper.toPersistence(deliveryEntity);
    const { id, ...updateData } = persistenceData;

    expect(prismaMock.delivery.upsert).toHaveBeenCalledWith({
      where: { id: deliveryEntity.id },
      create: persistenceData,
      update: updateData,
    });
  });

  test('delete should call delete on prisma client', async () => {
    await repository.delete('delivery-id-1');

    expect(prismaMock.delivery.delete).toHaveBeenCalledWith({
      where: { id: 'delivery-id-1' },
    });
  });
});