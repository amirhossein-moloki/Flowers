import { PrismaOrderRepository } from '../prisma-order.repository';
import { Order, OrderItem, OrderStatus } from '../../domain/order.entity';
import { prismaMock } from '../../../__tests__/helpers/prisma-mock.helper';
import { Order as PrismaOrder, OrderItem as PrismaOrderItem, Product as PrismaProduct } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

describe('PrismaOrderRepository', () => {
  let repository: PrismaOrderRepository;
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

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
  if (!orderItemEntityResult.success) {
    throw new Error('Failed to create order item entity');
  }
  const orderItemEntity = orderItemEntityResult.value;

  const orderEntityResult = Order.create({
    userId,
    items: [orderItemEntity],
    status: OrderStatus.PENDING,
    total: 100,
  }, orderId);
  if (!orderEntityResult.success) {
    throw new Error('Failed to create order entity');
  }
  const orderEntity = orderEntityResult.value;

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

    it('should return null if order is not found', async () => {
      prismaMock.order.findUnique.mockResolvedValue(null);

      const result = await repository.findById(orderId);

      expect(result).toBeNull();
    });
  });

  describe('save', () => {
    it('should use a transaction to save an order and its items', async () => {
      // Mock the transaction
      prismaMock.$transaction.mockImplementation((callback: any) => callback(prismaMock));
      prismaMock.order.upsert.mockResolvedValue(prismaOrder as any);
      prismaMock.orderItem.upsert.mockResolvedValue({} as any);

      await repository.save(orderEntity!);

      expect(prismaMock.$transaction).toHaveBeenCalled();
      expect(prismaMock.order.upsert).toHaveBeenCalled();
      expect(prismaMock.orderItem.upsert).toHaveBeenCalled();
    });
  });
});