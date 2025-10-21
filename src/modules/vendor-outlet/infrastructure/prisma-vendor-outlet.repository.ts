import { PrismaClient } from '@prisma/client';
import { IVendorOutletRepository } from '../domain/vendor-outlet.repository';
import { VendorOutlet } from '../domain/vendor-outlet.entity';
import { VendorOutletMapper } from './vendor-outlet.mapper';

export class PrismaVendorOutletRepository implements IVendorOutletRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<VendorOutlet | null> {
    const outlet = await this.prisma.vendorOutlet.findUnique({ where: { id } });
    return outlet ? VendorOutletMapper.toDomain(outlet) : null;
  }

  async findByVendorId(vendorId: string): Promise<VendorOutlet[]> {
    const outlets = await this.prisma.vendorOutlet.findMany({
      where: { vendor_id: vendorId },
    });
    return outlets.map(VendorOutletMapper.toDomain);
  }

  async findAll(): Promise<VendorOutlet[]> {
    const outlets = await this.prisma.vendorOutlet.findMany();
    return outlets.map(VendorOutletMapper.toDomain);
  }

  async save(vendorOutlet: VendorOutlet): Promise<VendorOutlet> {
    const data = VendorOutletMapper.toPersistence(vendorOutlet);
    const savedOutlet = await this.prisma.vendorOutlet.upsert({
      where: { id: vendorOutlet.id },
      update: {
        ...data,
        vendor: {
          connect: { id: vendorOutlet.vendorId },
        },
      },
      create: {
        ...data,
        vendor: {
          connect: { id: vendorOutlet.vendorId },
        },
      },
    });
    return VendorOutletMapper.toDomain(savedOutlet);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.vendorOutlet.delete({ where: { id } });
      return true;
    } catch (error) {
      return false;
    }
  }
}