import { PrismaClient, Vendor as PrismaVendor } from '@prisma/client';
import { PrismaVendorRepository } from '../../vendor/infrastructure/prisma-vendor.repository';
import { Vendor } from '../../vendor/domain/vendor.entity';
import { VendorMapper } from '../../vendor/infrastructure/vendor.mapper';

const mockPrisma = {
  vendor: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
  },
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrisma),
}));

describe('PrismaVendorRepository', () => {
  let repository: PrismaVendorRepository;
  let prisma: PrismaClient;

  const now = new Date();
  const vendorProps = {
    name: 'Test Vendor',
    description: 'A test vendor',
    email: 'test@vendor.com',
    phone: '1234567890',
    address: '123 Test St',
    is_active: true,
    createdAt: now,
    updatedAt: now,
  };

  const vendorResult = Vendor.create(vendorProps, 'test-id');
  const vendorEntity = vendorResult.success ? vendorResult.value : null;
  if (!vendorEntity) {
    throw new Error('Test setup failed: could not create vendor entity');
  }

  const prismaVendor: PrismaVendor = {
    id: 'test-id',
    name: vendorProps.name,
    description: vendorProps.description ?? null,
    email: vendorProps.email,
    phone: vendorProps.phone,
    address: vendorProps.address,
    is_active: vendorProps.is_active,
    created_at: vendorProps.createdAt,
    updated_at: vendorProps.updatedAt,
  };

  beforeEach(() => {
    prisma = new PrismaClient();
    repository = new PrismaVendorRepository(prisma);
    jest.clearAllMocks();
  });

  it('should find a vendor by id', async () => {
    mockPrisma.vendor.findUnique.mockResolvedValue(prismaVendor);
    const result = await repository.findById('test-id');
    expect(result).toEqual(vendorEntity);
    expect(mockPrisma.vendor.findUnique).toHaveBeenCalledWith({ where: { id: 'test-id' } });
  });

  it('should return null if vendor not found', async () => {
    mockPrisma.vendor.findUnique.mockResolvedValue(null);
    const result = await repository.findById('not-found-id');
    expect(result).toBeNull();
  });

  it('should find all vendors', async () => {
    mockPrisma.vendor.findMany.mockResolvedValue([prismaVendor]);
    const result = await repository.findAll();
    expect(result).toEqual([vendorEntity]);
    expect(mockPrisma.vendor.findMany).toHaveBeenCalled();
  });

  it('should save a vendor', async () => {
    mockPrisma.vendor.upsert.mockResolvedValue(prismaVendor);
    const result = await repository.save(vendorEntity);
    expect(result).toEqual(vendorEntity);
    expect(mockPrisma.vendor.upsert).toHaveBeenCalledWith({
      where: { id: 'test-id' },
      update: VendorMapper.toPersistence(vendorEntity),
      create: VendorMapper.toPersistence(vendorEntity),
    });
  });

  it('should delete a vendor', async () => {
    mockPrisma.vendor.delete.mockResolvedValue(prismaVendor);
    const result = await repository.delete('test-id');
    expect(result).toBe(true);
    expect(mockPrisma.vendor.delete).toHaveBeenCalledWith({ where: { id: 'test-id' } });
  });

  it('should return false if delete fails', async () => {
    mockPrisma.vendor.delete.mockRejectedValue(new Error('Delete failed'));
    const result = await repository.delete('fail-id');
    expect(result).toBe(false);
  });
});