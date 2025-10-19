import { IShippingRateRepository } from '@/modules/shipping-rate/domain/shipping-rate.repository';
import { ShippingRate } from '@/modules/shipping-rate/domain/shipping-rate.entity';
import { PrismaClient } from '@prisma/client';
import { ShippingRateMapper } from '@/modules/shipping-rate/infrastructure/shipping-rate.mapper';

export class PrismaShippingRateRepository implements IShippingRateRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<ShippingRate | null> {
    const shippingRate = await this.prisma.shippingRate.findUnique({ where: { id } });
    return shippingRate ? ShippingRateMapper.toDomain(shippingRate) : null;
  }

  async findByServiceZoneId(serviceZoneId: string): Promise<ShippingRate[]> {
    const shippingRates = await this.prisma.shippingRate.findMany({
      where: { service_zone_id: serviceZoneId },
    });
    return shippingRates.map(ShippingRateMapper.toDomain);
  }

  async findAll(): Promise<ShippingRate[]> {
    const shippingRates = await this.prisma.shippingRate.findMany();
    return shippingRates.map(ShippingRateMapper.toDomain);
  }

  async save(shippingRate: ShippingRate): Promise<ShippingRate> {
    const data = ShippingRateMapper.toPersistence(shippingRate);
    await this.prisma.shippingRate.upsert({
      where: { id: shippingRate.id },
      update: data,
      create: data,
    });
    return shippingRate;
  }

  async update(shippingRate: ShippingRate): Promise<ShippingRate> {
    const data = ShippingRateMapper.toPersistence(shippingRate);
    const updatedShippingRate = await this.prisma.shippingRate.update({
      where: { id: shippingRate.id },
      data,
    });
    return ShippingRateMapper.toDomain(updatedShippingRate);
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.shippingRate.delete({ where: { id } });
    return true;
  }
}
