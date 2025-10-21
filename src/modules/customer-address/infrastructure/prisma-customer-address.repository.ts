import { ICustomerAddressRepository } from '@/modules/customer-address/domain/customer-address.repository.interface';
import { CustomerAddress } from '@/modules/customer-address/domain/customer-address.entity';
import { PrismaClient } from '@prisma/client';
import { CustomerAddressMapper } from '@/modules/customer-address/infrastructure/customer-address.mapper';

export class PrismaCustomerAddressRepository implements ICustomerAddressRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async findById(id: string): Promise<CustomerAddress | null> {
    const customerAddress = await this.prisma.customerAddress.findUnique({ where: { id }, include: { address: true } });
    return customerAddress ? CustomerAddressMapper.toDomain(customerAddress) : null;
  }

  async findAll(): Promise<CustomerAddress[]> {
    const customerAddresses = await this.prisma.customerAddress.findMany({ include: { address: true } });
    return customerAddresses.map(CustomerAddressMapper.toDomain);
  }

  async findByUserId(userId: string): Promise<CustomerAddress[]> {
    const customerAddresses = await this.prisma.customerAddress.findMany({ where: { user_id: userId }, include: { address: true } });
    return customerAddresses.map(CustomerAddressMapper.toDomain);
  }

  async save(customerAddress: CustomerAddress): Promise<void> {
    const data = CustomerAddressMapper.toPersistence(customerAddress);
    await this.prisma.customerAddress.upsert({
      where: { id: customerAddress.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.customerAddress.delete({ where: { id } });
  }
}