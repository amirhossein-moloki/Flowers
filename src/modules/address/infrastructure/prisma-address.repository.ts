import { IAddressRepository } from '@/modules/address/domain/address.repository';
import { Address } from '@/modules/address/domain/address.entity';
import prisma from '@/infrastructure/database/prisma/prisma-client';
import { AddressMapper } from '@/modules/address/infrastructure/address.mapper';

export class PrismaAddressRepository implements IAddressRepository {
  async findById(id: string): Promise<Address | null> {
    const address = await prisma.address.findUnique({ where: { id } });
    return address ? AddressMapper.toDomain(address) : null;
  }

  async findAll(page: number, pageSize: number): Promise<Address[]> {
    const addresses = await prisma.address.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return addresses.map(AddressMapper.toDomain);
  }

  async save(address: Address): Promise<void> {
    const data = AddressMapper.toPersistence(address);
    await prisma.address.upsert({
      where: { id: address.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.address.delete({ where: { id } });
  }
}