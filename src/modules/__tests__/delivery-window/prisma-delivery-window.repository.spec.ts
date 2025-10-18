import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaDeliveryWindowRepository } from '../../delivery-window/infrastructure/prisma-delivery-window.repository';
import { DeliveryWindow } from '../../delivery-window/domain/delivery-window.entity';

describe('PrismaDeliveryWindowRepository', () => {
  let repository: PrismaDeliveryWindowRepository;
  let prisma: DeepMockProxy<PrismaClient>;

  const deliveryWindowProps = {
    label: 'Morning',
    start_time: '08:00',
    end_time: '12:00',
    cutoff_time: '07:00',
    zone_id: 'zone-uuid',
    is_active: true,
  };
  const deliveryWindowEntityResult = DeliveryWindow.create(deliveryWindowProps, 'window-uuid');
  const deliveryWindowEntity = deliveryWindowEntityResult.success ? deliveryWindowEntityResult.value : null;

  const prismaDeliveryWindow = {
    id: deliveryWindowEntity!.id,
    ...deliveryWindowProps,
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(() => {
    prisma = mockDeep<PrismaClient>();
    repository = new PrismaDeliveryWindowRepository(prisma as unknown as PrismaClient);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findById', () => {
    it('should return a delivery window entity if found', async () => {
      (prisma.deliveryWindow.findUnique as jest.Mock).mockResolvedValue(prismaDeliveryWindow);

      const result = await repository.findById('window-uuid');

      expect(result).toBeInstanceOf(DeliveryWindow);
      expect(result!.id).toBe(prismaDeliveryWindow.id);
    });

    it('should return null if delivery window not found', async () => {
      (prisma.deliveryWindow.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById('non-existent-uuid');

      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return an array of delivery window entities', async () => {
      (prisma.deliveryWindow.findMany as jest.Mock).mockResolvedValue([prismaDeliveryWindow]);

      const result = await repository.findAll();

      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(DeliveryWindow);
    });
  });

  describe('save', () => {
    it('should call prisma.deliveryWindow.upsert with correct data', async () => {
      await repository.save(deliveryWindowEntity!);

      expect(prisma.deliveryWindow.upsert).toHaveBeenCalledWith({
        where: { id: deliveryWindowEntity!.id },
        create: {
          id: deliveryWindowEntity!.id,
          ...deliveryWindowProps,
        },
        update: deliveryWindowProps,
      });
    });
  });

  describe('delete', () => {
    it('should call prisma.deliveryWindow.delete with correct data', async () => {
      await repository.delete('window-uuid');

      expect(prisma.deliveryWindow.delete).toHaveBeenCalledWith({
        where: { id: 'window-uuid' },
      });
    });
  });
});
