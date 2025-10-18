import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaDeliveryStatusRepository } from '../../delivery-status/infrastructure/prisma-delivery-status.repository';
import { DeliveryStatus } from '../../delivery-status/domain/delivery-status.entity';

describe('PrismaDeliveryStatusRepository', () => {
  let repository: PrismaDeliveryStatusRepository;
  let prisma: DeepMockProxy<PrismaClient>;

  const deliveryStatusProps = {
    code: 'PENDING',
    name: 'Pending',
    display_order: 1,
  };
  const deliveryStatusEntityResult = DeliveryStatus.create(deliveryStatusProps, 'status-uuid');
  const deliveryStatusEntity = deliveryStatusEntityResult.success ? deliveryStatusEntityResult.value : null;

  const prismaDeliveryStatus = {
    id: deliveryStatusEntity!.id,
    ...deliveryStatusProps,
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(() => {
    prisma = mockDeep<PrismaClient>();
    repository = new PrismaDeliveryStatusRepository(prisma as unknown as PrismaClient);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findById', () => {
    it('should return a delivery status entity if found', async () => {
      (prisma.deliveryStatus.findUnique as jest.Mock).mockResolvedValue(prismaDeliveryStatus);

      const result = await repository.findById('status-uuid');

      expect(result).toBeInstanceOf(DeliveryStatus);
      expect(result!.id).toBe(prismaDeliveryStatus.id);
    });

    it('should return null if delivery status not found', async () => {
      (prisma.deliveryStatus.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById('non-existent-uuid');

      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return an array of delivery status entities', async () => {
      (prisma.deliveryStatus.findMany as jest.Mock).mockResolvedValue([prismaDeliveryStatus]);

      const result = await repository.findAll();

      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(DeliveryStatus);
    });
  });

  describe('save', () => {
    it('should call prisma.deliveryStatus.upsert with correct data', async () => {
      await repository.save(deliveryStatusEntity!);

      expect(prisma.deliveryStatus.upsert).toHaveBeenCalledWith({
        where: { id: deliveryStatusEntity!.id },
        create: {
          id: deliveryStatusEntity!.id,
          ...deliveryStatusProps,
        },
        update: deliveryStatusProps,
      });
    });
  });

  describe('delete', () => {
    it('should call prisma.deliveryStatus.delete with correct data', async () => {
      await repository.delete('status-uuid');

      expect(prisma.deliveryStatus.delete).toHaveBeenCalledWith({
        where: { id: 'status-uuid' },
      });
    });
  });
});
