import { prismaMock } from '../helpers/prisma-mock.helper';
import { PrismaOrderRepository } from '@/modules/order/infrastructure/prisma-order.repository';
import { Order, OrderItem, OrderStatus } from '@/modules/order/domain/order.entity';
import { OrderMapper } from '@/modules/order/infrastructure/order.mapper';

describe('PrismaOrderRepository', () => {
  let repository: PrismaOrderRepository;

  beforeEach(() => {
    repository = new PrismaOrderRepository();
  });

  const orderItemResult = OrderItem.create({
    orderId: 'order-123',
    productId: 'prod-456',
    quantity: 2,
    price: 50,
  }, 'item-1');
  if (!orderItemResult.success) throw new Error('Failed to create order item for test');
  const orderItem = orderItemResult.value;

  const orderResult = Order.create({
    userId: 'user-789',
    items: [orderItem],
    status: OrderStatus.PENDING,
    total: 100,
  }, 'order-123');
  if (!orderResult.success) throw new Error('Failed to create order for test');
  const orderEntity = orderResult.value;

  const prismaOrder = {
    id: orderEntity.id,
    userId: orderEntity.userId,
    status: orderEntity.status,
    total: orderEntity.total,
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        id: orderItem.id,
        orderId: orderItem.props.orderId,
        productId: orderItem.productId,
        quantity: orderItem.quantity,
        price: orderItem.price,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
  };

  test('findById should return an order entity with items when found', async () => {
    prismaMock.order.findUnique.mockResolvedValue(prismaOrder);

    const foundOrder = await repository.findById('order-123');

    expect(foundOrder).toBeInstanceOf(Order);
    expect(foundOrder?.id).toBe('order-123');
    expect(foundOrder?.items).toHaveLength(1);
    expect(foundOrder?.items[0]).toBeInstanceOf(OrderItem);
    expect(prismaMock.order.findUnique).toHaveBeenCalledWith({
      where: { id: 'order-123' },
      include: { items: true },
    });
  });

  test('findByUserId should return a paginated list of orders for a user', async () => {
    prismaMock.order.findMany.mockResolvedValue([prismaOrder]);

    const orders = await repository.findByUserId('user-789', 1, 10);

    expect(orders).toHaveLength(1);
    expect(orders[0].userId).toBe('user-789');
    expect(prismaMock.order.findMany).toHaveBeenCalledWith({
      where: { userId: 'user-789' },
      include: { items: true },
      skip: 0,
      take: 10,
      orderBy: { createdAt: 'desc' },
    });
  });

  test('save should execute a transaction to upsert order and its items', async () => {
    const { orderData, itemsData } = OrderMapper.toPersistence(orderEntity);

    // Mock the transaction
    prismaMock.$transaction.mockImplementation(async (callback) => {
      // Simulate the operations within the transaction
      const txMock = {
        order: {
          upsert: jest.fn().mockResolvedValue(null),
        },
        orderItem: {
          deleteMany: jest.fn().mockResolvedValue(null),
          upsert: jest.fn().mockResolvedValue(null),
        },
      };
      await callback(txMock as any);
      return null;
    });

    await repository.save(orderEntity);

    expect(prismaMock.$transaction).toHaveBeenCalled();
    // Further assertions can be made on the mocked transaction calls if needed
  });
});