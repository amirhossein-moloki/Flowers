import { PrismaOrderStatusRepository } from '../../order-status/infrastructure/prisma-order-status.repository';
import { OrderStatus } from '../../order-status/domain/order-status.entity';
import prisma from '../../../infrastructure/database/prisma/prisma-client';
import { OrderStatusMapper } from '../../order-status/infrastructure/order-status.mapper';

jest.mock('../../../infrastructure/database/prisma/prisma-client', () => ({
  orderStatus: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock('../../order-status/infrastructure/order-status.mapper', () => ({
  OrderStatusMapper: {
    toDomain: jest.fn(),
    toPersistence: jest.fn(),
  },
}));

describe('PrismaOrderStatusRepository', () => {
  let repository: PrismaOrderStatusRepository;
  let mockPrisma;
  let mockMapper;

  beforeEach(() => {
    repository = new PrismaOrderStatusRepository();
    mockPrisma = prisma.orderStatus;
    mockMapper = OrderStatusMapper;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return an order status if found', async () => {
      const orderStatusId = 'some-id';
      const prismaOrderStatus = { id: orderStatusId, name: 'Pending', code: 'PENDING', display_order: 1, is_terminal: false, created_at: new Date(), updated_at: new Date() };
      const domainOrderStatus = OrderStatus.create({ name: 'Pending', code: 'PENDING', display_order: 1, is_terminal: false }, orderStatusId).value;

      mockPrisma.findUnique.mockResolvedValue(prismaOrderStatus);
      mockMapper.toDomain.mockReturnValue(domainOrderStatus);

      const result = await repository.findById(orderStatusId);

      expect(result).toEqual(domainOrderStatus);
      expect(mockPrisma.findUnique).toHaveBeenCalledWith({ where: { id: orderStatusId } });
      expect(mockMapper.toDomain).toHaveBeenCalledWith(prismaOrderStatus);
    });

    it('should return null if order status not found', async () => {
      const orderStatusId = 'non-existent-id';
      mockPrisma.findUnique.mockResolvedValue(null);

      const result = await repository.findById(orderStatusId);

      expect(result).toBeNull();
      expect(mockPrisma.findUnique).toHaveBeenCalledWith({ where: { id: orderStatusId } });
    });
  });

  describe('findAll', () => {
    it('should return all order statuses', async () => {
      const prismaOrderStatuses = [
        { id: '1', name: 'Pending', code: 'PENDING', display_order: 1, is_terminal: false, created_at: new Date(), updated_at: new Date() },
        { id: '2', name: 'Shipped', code: 'SHIPPED', display_order: 2, is_terminal: false, created_at: new Date(), updated_at: new Date() },
      ];
      const domainOrderStatuses = prismaOrderStatuses.map(pos => OrderStatus.create({ name: pos.name, code: pos.code, display_order: pos.display_order, is_terminal: pos.is_terminal }, pos.id).value);

      mockPrisma.findMany.mockResolvedValue(prismaOrderStatuses);
      mockMapper.toDomain.mockImplementation(pos => domainOrderStatuses.find(dos => dos.id === pos.id));

      const result = await repository.findAll();

      expect(result).toEqual(domainOrderStatuses);
      expect(mockPrisma.findMany).toHaveBeenCalled();
      expect(mockMapper.toDomain).toHaveBeenCalledTimes(2);
    });
  });

  describe('save', () => {
    it('should upsert an order status', async () => {
      const orderStatus = OrderStatus.create({ name: 'Delivered', code: 'DELIVERED', display_order: 3, is_terminal: true }, 'some-id').value;
      const persistenceOrderStatus = { id: 'some-id', name: 'Delivered', code: 'DELIVERED', display_order: 3, is_terminal: true, created_at: new Date(), updated_at: new Date() };

      mockMapper.toPersistence.mockReturnValue(persistenceOrderStatus);

      await repository.save(orderStatus);

      expect(mockMapper.toPersistence).toHaveBeenCalledWith(orderStatus);
      expect(mockPrisma.upsert).toHaveBeenCalledWith({
        where: { id: orderStatus.id },
        update: persistenceOrderStatus,
        create: persistenceOrderStatus,
      });
    });
  });

  describe('delete', () => {
    it('should delete an order status', async () => {
      const orderStatusId = 'some-id';
      await repository.delete(orderStatusId);
      expect(mockPrisma.delete).toHaveBeenCalledWith({ where: { id: orderStatusId } });
    });
  });
});