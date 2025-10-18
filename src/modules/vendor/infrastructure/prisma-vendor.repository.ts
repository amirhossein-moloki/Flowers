import { PrismaClient } from '@prisma/client';
import { IVendorRepository } from '../domain/vendor.repository';
import { Vendor } from '../domain/vendor.entity';
import { VendorMapper } from './vendor.mapper';

export class PrismaVendorRepository implements IVendorRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Vendor | null> {
    const vendor = await this.prisma.vendor.findUnique({ where: { id } });
    return vendor ? VendorMapper.toDomain(vendor) : null;
  }

  async findAll(): Promise<Vendor[]> {
    const vendors = await this.prisma.vendor.findMany();
    return vendors.map(VendorMapper.toDomain);
  }

  async save(vendor: Vendor): Promise<Vendor> {
    const data = VendorMapper.toPersistence(vendor);
    const savedVendor = await this.prisma.vendor.upsert({
      where: { id: vendor.id },
      update: data,
      create: data,
    });
    return VendorMapper.toDomain(savedVendor);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.vendor.delete({ where: { id } });
      return true;
    } catch (error) {
      // Handle specific errors if needed, e.g., record not found
      return false;
    }
  }
}