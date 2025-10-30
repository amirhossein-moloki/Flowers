import { PrismaDeliveryStatusRepository } from '../../delivery-status/infrastructure/prisma-delivery-status.repository';
import { DeliveryStatus } from '../../delivery-status/domain/delivery-status.entity';
import { prismaMock } from '../helpers/prisma-mock.helper';

describe('PrismaDeliveryStatusRepository', () => {
  let repository: PrismaDeliveryStatusRepository;

  beforeEach(() => {
    repository = new PrismaDeliveryStatusRepository(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return a delivery status if found', async () => {
      const deliveryStatusId = 'some-id';
      const prismaDeliveryStatus = {
        id: deliveryStatusId,
        delivery_id: 'delivery-id',
        status: 'PENDING',
        notes: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      prismaMock.deliveryStatus.findUnique.mockResolvedValue(prismaDeliveryStatus);

      const result = await repository.findById(deliveryStatusId);

      expect(result.isSuccess()).toBe(true);
      const deliveryStatus = result.value as DeliveryStatus;
      expect(deliveryStatus).toBeInstanceOf(DeliveryStatus);
      expect(deliveryStatus.id).toEqual(deliveryStatusId);
      expect(prismaMock.deliveryStatus.findUnique).toHaveBeenCalledWith({
        where: { id: deliveryStatusId },
      });
    });

    it('should return a failure if delivery status not found', async () => {
      const deliveryStatusId = 'non-existent-id';
      prismaMock.deliveryStatus.findUnique.mockResolvedValue(null);

      const result = await repository.findById(deliveryStatusId);

      expect(result.isFailure()).toBe(true);
      expect(result.error?.message).toEqual('Delivery status not found');
    });
  });

  describe('findAll', () => {
    it('should return all delivery statuses', async () => {
      const prismaDeliveryStatuses = [
        {
          id: '1',
          delivery_id: 'delivery-1',
          status: 'PENDING',
          notes: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '2',
          delivery_id: 'delivery-2',
          status: 'SHIPPED',
          notes: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      prismaMock.deliveryStatus.findMany.mockResolvedValue(
        prismaDeliveryStatuses,
      );

      const result = await repository.findAll();

      expect(result.isSuccess()).toBe(true);
      const deliveryStatuses = result.value as DeliveryStatus[];
      expect(deliveryStatuses).toHaveLength(2);
      expect(deliveryStatuses[0]).toBeInstanceOf(DeliveryStatus);
      expect(deliveryStatuses[0].id).toEqual('1');
      expect(prismaMock.deliveryStatus.findMany).toHaveBeenCalled();
    });
  });

  describe('save', () => {
    it('should save a delivery status and return it', async () => {
      const deliveryStatusData = {
        delivery_id: 'delivery-id',
        status: 'DELIVERED',
        notes: 'Left at front door',
      };
      const deliveryStatusResult = DeliveryStatus.create(deliveryStatusData, 'some-id');
      const deliveryStatus = deliveryStatusResult.value as DeliveryStatus;
      const prismaDeliveryStatus = { ...deliveryStatusData, id: deliveryStatus.id, created_at: new Date(), updated_at: new Date() };

      prismaMock.deliveryStatus.upsert.mockResolvedValue(prismaDeliveryStatus);

      const result = await repository.save(deliveryStatus);

      expect(result.isSuccess()).toBe(true);
      expect(result.value).toBeInstanceOf(DeliveryStatus);
      expect(prismaMock.deliveryStatus.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: deliveryStatus.id },
          update: expect.any(Object),
          create: expect.any(Object),
        }),
      );
    });
  });

  describe('delete', () => {
    it('should delete a delivery status and return success', async () => {
      const deliveryStatusId = 'some-id';
      prismaMock.deliveryStatus.delete.mockResolvedValue({} as any);

      const result = await repository.delete(deliveryStatusId);

      expect(result.isSuccess()).toBe(true);
      expect(prismaMock.deliveryStatus.delete).toHaveBeenCalledWith({
        where: { id: deliveryStatusId },
      });
    });
  });
});
