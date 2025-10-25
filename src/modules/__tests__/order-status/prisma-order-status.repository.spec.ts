import { PrismaOrderStatusRepository } from '../../order-status/infrastructure/prisma-order-status.repository';
import { OrderStatus } from '../../order-status/domain/order-status.entity';
import { prismaMock } from '../helpers/prisma-mock.helper';
import { OrderStatusMapper } from '../../order-status/infrastructure/order-status.mapper';

describe('PrismaOrderStatusRepository', () => {
  let repository: PrismaOrderStatusRepository;

  beforeEach(() => {
    repository = new PrismaOrderStatusRepository(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return an order status if found', async () => {
      const orderStatusId = 'some-id';
      const prismaOrderStatus = { id: orderStatusId, name: 'Pending', code: 'PENDING', display_order: 1, is_terminal: false, created_at: new Date(), updated_at: new Date() };

      prismaMock.orderStatus.findUnique.mockResolvedValue(prismaOrderStatus);

      const result = await repository.findById(orderStatusId);

      expect(result.value).toBeInstanceOf(OrderStatus);
      expect(result.value?.id).toEqual(orderStatusId);
      expect(prismaMock.orderStatus.findUnique).toHaveBeenCalledWith({ where: { id: orderStatusId } });
    });

    it('should return null if order status not found', async () => {
      const orderStatusId = 'non-existent-id';
      prismaMock.orderStatus.findUnique.mockResolvedValue(null);

      const result = await repository.findById(orderStatusId);

      expect(result.value).toBeNull();
      expect(prismaMock.orderStatus.findUnique).toHaveBeenCalledWith({ where: { id: orderStatusId } });
    });
  });

  describe('findAll', () => {
    it('should return all order statuses', async () => {
      const prismaOrderStatuses = [
        { id: '1', name: 'Pending', code: 'PENDING', display_order: 1, is_terminal: false, created_at: new Date(), updated_at: new Date() },
        { id: '2', name: 'Shipped', code: 'SHIPPED', display_order: 2, is_terminal: false, created_at: new Date(), updated_at: new Date() },
      ];

      prismaMock.orderStatus.findMany.mockResolvedValue(prismaOrderStatuses);

      const result = await repository.findAll();

      expect(result.value).toHaveLength(2);
      expect(result.value[0]).toBeInstanceOf(OrderStatus);
      expect(result.value[0].id).toEqual('1');
      expect(prismaMock.orderStatus.findMany).toHaveBeenCalled();
    });
  });

  describe('save', () => {
    it('should upsert an order status', async () => {
      const orderStatus = OrderStatus.create({ name: 'Delivered', code: 'DELIVERED', display_order: 3, is_terminal: true }, 'some-id').value;
      const persistenceData = OrderStatusMapper.toPersistence(orderStatus);

      await repository.save(orderStatus);

      expect(prismaMock.orderStatus.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: orderStatus.id },
          update: expect.any(Object),
          create: expect.any(Object),
        }),
      );
    });
  });

  describe('delete', () => {
    it('should delete an order status', async () => {
      const orderStatusId = 'some-id';
      await repository.delete(orderStatusId);
      expect(prismaMock.orderStatus.delete).toHaveBeenCalledWith({ where: { id: orderStatusId } });
    });
  });
});