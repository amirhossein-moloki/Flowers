import { PrismaClient, VendorOutlet as PrismaVendorOutlet } from '@prisma/client';
import { PrismaVendorOutletRepository } from '../../vendor-outlet/infrastructure/prisma-vendor-outlet.repository';
import { VendorOutlet } from '../../vendor-outlet/domain/vendor-outlet.entity';
import { VendorOutletMapper } from '../../vendor-outlet/infrastructure/vendor-outlet.mapper';

const mockPrisma = {
  vendorOutlet: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
  },
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrisma),
}));

describe('PrismaVendorOutletRepository', () => {
  let repository: PrismaVendorOutletRepository;
  let prisma: PrismaClient;

  const now = new Date();
  const outletProps = {
    vendor_id: 'vendor-id',
    name: 'Test Outlet',
    address: '456 Test Ave',
    latitude: 40.7128,
    longitude: -74.0060,
    is_active: true,
    createdAt: now,
    updatedAt: now,
  };

  const outletResult = VendorOutlet.create(outletProps, 'outlet-id');
  const outletEntity = outletResult.success ? outletResult.value : null;
  if (!outletEntity) {
    throw new Error('Test setup failed: could not create outlet entity');
  }

  const prismaOutlet: PrismaVendorOutlet = {
    id: 'outlet-id',
    vendor_id: outletProps.vendor_id,
    name: outletProps.name,
    address: outletProps.address,
    latitude: outletProps.latitude,
    longitude: outletProps.longitude,
    is_active: outletProps.is_active,
    created_at: outletProps.createdAt,
    updated_at: outletProps.updatedAt,
  };

  beforeEach(() => {
    prisma = new PrismaClient();
    repository = new PrismaVendorOutletRepository(prisma);
    jest.clearAllMocks();
  });

  it('should find an outlet by id', async () => {
    mockPrisma.vendorOutlet.findUnique.mockResolvedValue(prismaOutlet);
    const result = await repository.findById('outlet-id');
    expect(result).toEqual(outletEntity);
    expect(mockPrisma.vendorOutlet.findUnique).toHaveBeenCalledWith({ where: { id: 'outlet-id' } });
  });

  it('should find outlets by vendor id', async () => {
    mockPrisma.vendorOutlet.findMany.mockResolvedValue([prismaOutlet]);
    const result = await repository.findByVendorId('vendor-id');
    expect(result).toEqual([outletEntity]);
    expect(mockPrisma.vendorOutlet.findMany).toHaveBeenCalledWith({ where: { vendor_id: 'vendor-id' } });
  });

  it('should save an outlet', async () => {
    mockPrisma.vendorOutlet.upsert.mockResolvedValue(prismaOutlet);
    const result = await repository.save(outletEntity);
    expect(result).toEqual(outletEntity);
    expect(mockPrisma.vendorOutlet.upsert).toHaveBeenCalledWith({
      where: { id: 'outlet-id' },
      update: VendorOutletMapper.toPersistence(outletEntity),
      create: VendorOutletMapper.toPersistence(outletEntity),
    });
  });

  it('should delete an outlet', async () => {
    mockPrisma.vendorOutlet.delete.mockResolvedValue(prismaOutlet);
    const result = await repository.delete('outlet-id');
    expect(result).toBe(true);
    expect(mockPrisma.vendorOutlet.delete).toHaveBeenCalledWith({ where: { id: 'outlet-id' } });
  });
});