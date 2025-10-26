import { prismaMock } from '../helpers/prisma-mock.helper';
import { PrismaOrderPromotionRepository } from '@/modules/order-promotion/infrastructure/prisma-order-promotion.repository';
import { OrderPromotion } from '@/modules/order-promotion/domain/order-promotion.entity';
import { OrderPromotionMapper } from '@/modules/order-promotion/infrastructure/order-promotion.mapper';

describe('PrismaOrderPromotionRepository', () => {
  let repository: PrismaOrderPromotionRepository;

  beforeEach(() => {
    repository = new PrismaOrderPromotionRepository(prismaMock);
  });

  const orderPromotionProps = {
    order_id: 'order-123',
    promotion_id: 'promo-456',
    discount_applied: 10,
    created_at: new Date(),
  };
  const orderPromotionResult = OrderPromotion.create(orderPromotionProps, 'op-id-1');
  if (!orderPromotionResult.success) {
    throw new Error('Test setup failed: could not create order promotion entity');
  }
  const orderPromotionEntity = orderPromotionResult.value;

  const prismaOrderPromotion = {
    id: orderPromotionEntity.id,
    ...orderPromotionProps,
    updatedAt: new Date(),
  };

  test('findById should return an order promotion entity when found', async () => {
    prismaMock.orderPromotion.findUnique.mockResolvedValue(prismaOrderPromotion);

    const foundPromo = await repository.findById('op-id-1');

    expect(foundPromo).toBeInstanceOf(OrderPromotion);
    expect(foundPromo?.id).toBe('op-id-1');
    expect(prismaMock.orderPromotion.findUnique).toHaveBeenCalledWith({ where: { id: 'op-id-1' } });
  });

  test('findByOrderId should return an array of order promotion entities', async () => {
    prismaMock.orderPromotion.findMany.mockResolvedValue([prismaOrderPromotion]);

    const promos = await repository.findByOrderId('order-123');

    expect(promos).toHaveLength(1);
    expect(promos[0]).toBeInstanceOf(OrderPromotion);
    expect(prismaMock.orderPromotion.findMany).toHaveBeenCalledWith({ where: { order_id: 'order-123' } });
  });

  test('save should call upsert on prisma client', async () => {
    prismaMock.orderPromotion.upsert.mockResolvedValue(prismaOrderPromotion);
    await repository.save(orderPromotionEntity);

    expect(prismaMock.orderPromotion.upsert).toHaveBeenCalledWith({
      where: { id: orderPromotionEntity.id },
      create: OrderPromotionMapper.toPersistence(orderPromotionEntity),
      update: OrderPromotionMapper.toPersistence(orderPromotionEntity),
    });
  });

  test('delete should call delete on prisma client', async () => {
    await repository.delete('op-id-1');

    expect(prismaMock.orderPromotion.delete).toHaveBeenCalledWith({
      where: { id: 'op-id-1' },
    });
  });
});