import { PrismaDeliveryRepository } from '../prisma-delivery.repository';
import { Delivery } from '../../domain/delivery.entity';
import { prismaMock } from '../../../../modules/__tests__/helpers/prisma-mock.helper';
import { Delivery as PrismaDelivery, VehicleType } from '@prisma/client';
import { DeliveryMapper } from '../delivery.mapper';

jest.mock('../../../../infrastructure/database/prisma/prisma-client');

import { VehicleType as DomainVehicleType } from '../../../../core/domain/enums';

describe('PrismaDeliveryRepository', () => {
  let repository: PrismaDeliveryRepository;

  const deliveryProps = {
    order_id: 'order-uuid',
    courier_id: 'courier-uuid',
    status_id: 'status-uuid',
    vehicle_type: DomainVehicleType.CAR,
    assigned_at: new Date(),
    pickup_at: new Date(),
    dropoff_at: new Date(),
    distance_meters: 1000,
    eta_seconds: 600,
    failure_reason: '',
  };
  const deliveryEntityResult = Delivery.create(deliveryProps, 'delivery-uuid');
  const deliveryEntity = deliveryEntityResult.success ? deliveryEntityResult.value : null;

  const prismaDelivery: PrismaDelivery = {
    id: deliveryEntity!.id,
    ...deliveryProps,
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(() => {
    repository = new PrismaDeliveryRepository(prismaMock);
  });

  describe('save', () => {
    it('should call prisma.delivery.upsert with correct data', async () => {
      await repository.save(deliveryEntity!);

      const persistenceData = DeliveryMapper.toPersistence(deliveryEntity!);
      const { id, ...updateData } = persistenceData;
      expect(prismaMock.delivery.upsert).toHaveBeenCalledWith({
        where: { id: deliveryEntity!.id },
        create: persistenceData,
        update: updateData,
      });
    });
  });

  describe('findById', () => {
    it('should return a delivery entity if found', async () => {
      prismaMock.delivery.findUnique.mockResolvedValue(prismaDelivery);

      const result = await repository.findById('delivery-uuid');

      expect(result).toBeInstanceOf(Delivery);
      expect(result!.id).toBe(prismaDelivery.id);
    });

    it('should return null if delivery not found', async () => {
      prismaMock.delivery.findUnique.mockResolvedValue(null);

      const result = await repository.findById('non-existent-uuid');

      expect(result).toBeNull();
    });
  });
});