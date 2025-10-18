import { PrismaClient, ShippingRate as PrismaShippingRate } from '@prisma/client';
import { PrismaShippingRateRepository } from '../../shipping-rate/infrastructure/prisma-shipping-rate.repository';
import { ShippingRate } from '../../shipping-rate/domain/shipping-rate.entity';
import { ShippingRateMapper } from '../../shipping-rate/infrastructure/shipping-rate.mapper';

const mockPrisma = {
  shippingRate: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
  },
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrisma),
}));

describe('PrismaShippingRateRepository', () => {
  let repository: PrismaShippingRateRepository;
  let prisma: PrismaClient;

  const now = new Date();
  const rateProps = {
    service_zone_id: 'zone-id',
    rate: 10.5,
    currency: 'USD',
    weight_unit: 'kg',
    min_weight: 0,
    max_weight: 5,
    is_active: true,
    createdAt: now,
    updatedAt: now,
  };

  const rateResult = ShippingRate.create(rateProps, 'rate-id');
  const rateEntity = rateResult.success ? rateResult.value : null;
  if (!rateEntity) {
    throw new Error('Test setup failed: could not create rate entity');
  }

  const prismaRate: PrismaShippingRate = {
    id: 'rate-id',
    service_zone_id: rateProps.service_zone_id,
    rate: rateProps.rate,
    currency: rateProps.currency,
    weight_unit: rateProps.weight_unit,
    min_weight: rateProps.min_weight,
    max_weight: rateProps.max_weight,
    is_active: rateProps.is_active,
    created_at: rateProps.createdAt,
    updated_at: rateProps.updatedAt,
  };

  beforeEach(() => {
    prisma = new PrismaClient();
    repository = new PrismaShippingRateRepository(prisma);
    jest.clearAllMocks();
  });

  it('should find a rate by id', async () => {
    mockPrisma.shippingRate.findUnique.mockResolvedValue(prismaRate);
    const result = await repository.findById('rate-id');
    expect(result).toEqual(rateEntity);
    expect(mockPrisma.shippingRate.findUnique).toHaveBeenCalledWith({ where: { id: 'rate-id' } });
  });

  it('should find rates by service zone id', async () => {
    mockPrisma.shippingRate.findMany.mockResolvedValue([prismaRate]);
    const result = await repository.findByServiceZoneId('zone-id');
    expect(result).toEqual([rateEntity]);
    expect(mockPrisma.shippingRate.findMany).toHaveBeenCalledWith({ where: { service_zone_id: 'zone-id' } });
  });

  it('should save a rate', async () => {
    mockPrisma.shippingRate.upsert.mockResolvedValue(prismaRate);
    const result = await repository.save(rateEntity);
    expect(result).toEqual(rateEntity);
    expect(mockPrisma.shippingRate.upsert).toHaveBeenCalledWith({
      where: { id: 'rate-id' },
      update: ShippingRateMapper.toPersistence(rateEntity),
      create: ShippingRateMapper.toPersistence(rateEntity),
    });
  });

  it('should delete a rate', async () => {
    mockPrisma.shippingRate.delete.mockResolvedValue(prismaRate);
    const result = await repository.delete('rate-id');
    expect(result).toBe(true);
    expect(mockPrisma.shippingRate.delete).toHaveBeenCalledWith({ where: { id: 'rate-id' } });
  });
});