import { ICustomerAddressRepository } from '@/modules/customer-address/domain/customer-address.repository';
import { CustomerAddress } from '@/modules/customer-address/domain/customer-address.entity';
import prisma from '@/infrastructure/database/prisma/prisma-client';
import { CustomerAddressMapper } from '@/modules/customer-address/infrastructure/customer-address.mapper';

export class PrismaCustomerAddressRepository implements ICustomerAddressRepository {
  async findById(id: string): Promise<CustomerAddress | null> {
    const customerAddress = await prisma.customerAddress.findUnique({ where: { id } });
    return customerAddress ? CustomerAddressMapper.toDomain(customerAddress) : null;
  }

  async findAll(): Promise<CustomerAddress[]> {
    const customerAddresses = await prisma.customerAddress.findMany();
    return customerAddresses.map(CustomerAddressMapper.toDomain);
  }

  async save(customerAddress: CustomerAddress): Promise<void> {
    const data = CustomerAddressMapper.toPersistence(customerAddress);
    await prisma.customerAddress.upsert({
      where: { id: customerAddress.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.customerAddress.delete({ where: { id } });
  }
}