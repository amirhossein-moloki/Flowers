import { PrismaOrderRepository } from '../prisma-order.repository';
import { Order, OrderItem } from '../../domain/order.entity';
import { prismaMock } from '../../../__tests__/helpers/prisma-mock.helper';
import { Order as PrismaOrder, OrderItem as PrismaOrderItem, Product as PrismaProduct } from '@prisma/client';
import { OrderStatus } from '@prisma/client';

jest.mock('../../../../infrastructure/database/prisma/prisma-client');

describe('PrismaOrderRepository', () => {
  let repository: PrismaOrderRepository;

  // Helper data
  const userId = 'user-uuid';
  const orderId = 'order-uuid';
  const productId = 'product-uuid';

  const orderItemEntityResult = OrderItem.create({
    orderId,
    productId,
    quantity: 2,
    price: 50,
  }, 'order-item-uuid');
  const orderItemEntity = orderItemEntityResult.success ? orderItemEntityResult.value : null;

  const orderEntityResult = Order.create({
    userId,
    items: [orderItemEntity!],
    status: OrderStatus.PENDING,
    total: 100,
  }, orderId);
  const orderEntity = orderEntityResult.success ? orderEntityResult.value : null;

  const prismaOrder = {
    id: orderId,
    userId,
    status: OrderStatus.PENDING,
    total: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [{
      id: 'order-item-uuid',
      orderId,
      productId,
      quantity: 2,
      price: 50,
    }]
  };

  beforeEach(() => {
    repository = new PrismaOrderRepository(prismaMock);
  });

  describe('findById', () => {
    it('should return an order with items if found', async () => {
      prismaMock.order.findUnique.mockResolvedValue(prismaOrder as any);

      const result = await repository.findById(orderId);

      expect(result).toBeInstanceOf(Order);
      expect(result!.id).toBe(orderId);
      expect(result!.items).toHaveLength(1);
      expect(result!.items[0]).toBeInstanceOf(OrderItem);
    });
  });

  describe('save', () => {
    it('should use a transaction to save an order and its items', async () => {
      // Mock the transaction
      prismaMock.$transaction.mockImplementation((callback: any) => callback(prismaMock));

      await repository.save(orderEntity!);

      expect(prismaMock.$transaction).toHaveBeenCalled();
      expect(prismaMock.order.upsert).toHaveBeenCalled();
      expect(prismaMock.orderItem.upsert).toHaveBeenCalled();
    });
  });
});