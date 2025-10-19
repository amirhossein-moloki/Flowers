import { mockDeep, mockReset } from 'jest-mock-extended';
import { PrismaClient, DiscountType } from '@prisma/client';
import { PrismaPromotionRepository } from '@/modules/promotion/infrastructure/prisma-promotion.repository';
import { Promotion } from '@/modules/promotion/domain/promotion.entity';
import { PromotionMapper } from '@/modules/promotion/infrastructure/mappers/promotion.mapper';

jest.mock('@prisma/client', () => {
  const originalModule = jest.requireActual('@prisma/client');
  return {
    ...originalModule,
    DiscountType: {
      PERCENTAGE: 'PERCENTAGE',
      FIXED_AMOUNT: 'FIXED_AMOUNT',
    },
  };
});

const prismaMock = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prismaMock);
});

describe('PrismaPromotionRepository', () => {
  let repository: PrismaPromotionRepository;

  beforeEach(() => {
    repository = new PrismaPromotionRepository(prismaMock as any);
  });

  const promotionProps = {
    code: 'SUMMER25',
    description: '25% off for summer',
    discount_type: DiscountType.PERCENTAGE,
    discount_value: 25,
    start_date: new Date('2024-06-01'),
    end_date: new Date('2024-09-01'),
    max_uses: 1000,
    uses_count: 0,
    is_active: true,
  };
  const promotionResult = Promotion.create(promotionProps, 'promo-id-1');
  if (!promotionResult.success) {
    throw new Error('Test setup failed: could not create promotion entity');
  }
  const promotionEntity = promotionResult.value;

  const prismaPromotion = {
    id: promotionEntity.id,
    ...promotionProps,
    created_at: new Date(),
    updated_at: new Date(),
  };

  test('findById should return a promotion entity when found', async () => {
    prismaMock.promotion.findUnique.mockResolvedValue(prismaPromotion);

    const foundPromoResult = await repository.findById('promo-id-1');

    expect(foundPromoResult.success).toBe(true);
    const foundPromo = foundPromoResult.value as Promotion;
    expect(foundPromo).toBeInstanceOf(Promotion);
    expect(foundPromo?.id).toBe('promo-id-1');
    expect(prismaMock.promotion.findUnique).toHaveBeenCalledWith({ where: { id: 'promo-id-1' } });
  });

  test('findByCode should return a promotion entity when found', async () => {
    prismaMock.promotion.findUnique.mockResolvedValue(prismaPromotion);

    const foundPromoResult = await repository.findByCode('SUMMER25');

    expect(foundPromoResult.success).toBe(true);
    const foundPromo = foundPromoResult.value as Promotion;
    expect(foundPromo).toBeInstanceOf(Promotion);
    expect(foundPromo?.props.code).toBe('SUMMER25');
    expect(prismaMock.promotion.findUnique).toHaveBeenCalledWith({ where: { code: 'SUMMER25' } });
  });

  test('save should call create on prisma client', async () => {
    await repository.save(promotionEntity);

    expect(prismaMock.promotion.create).toHaveBeenCalledWith({
      data: PromotionMapper.toPersistence(promotionEntity),
    });
  });

  test('delete should call delete on prisma client', async () => {
    await repository.delete('promo-id-1');

    expect(prismaMock.promotion.delete).toHaveBeenCalledWith({
      where: { id: 'promo-id-1' },
    });
  });
});
