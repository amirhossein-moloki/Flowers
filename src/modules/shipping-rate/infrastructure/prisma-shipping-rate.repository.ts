import { PrismaClient } from '@prisma/client';
import { IShippingRateRepository } from '../domain/shipping-rate.repository';
import { ShippingRate } from '../domain/shipping-rate.entity';
import { ShippingRateMapper } from './shipping-rate.mapper';

export class PrismaShippingRateRepository implements IShippingRateRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<ShippingRate | null> {
    const rate = await this.prisma.shippingRate.findUnique({ where: { id } });
    return rate ? ShippingRateMapper.toDomain(rate) : null;
  }

  async findByServiceZoneId(serviceZoneId: string): Promise<ShippingRate[]> {
    const rates = await this.prisma.shippingRate.findMany({
      where: { service_zone_id: serviceZoneId },
    });
    return rates.map(ShippingRateMapper.toDomain);
  }

  async findAll(): Promise<ShippingRate[]> {
    const rates = await this.prisma.shippingRate.findMany();
    return rates.map(ShippingRateMapper.toDomain);
  }

  async save(shippingRate: ShippingRate): Promise<ShippingRate> {
    const data = ShippingRateMapper.toPersistence(shippingRate);
    const savedRate = await this.prisma.shippingRate.upsert({
      where: { id: shippingRate.id },
      update: data,
      create: data,
    });
    return ShippingRateMapper.toDomain(savedRate);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.shippingRate.delete({ where: { id } });
      return true;
    } catch (error) {
      return false;
    }
  }
}