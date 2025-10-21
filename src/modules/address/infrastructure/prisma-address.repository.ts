import { IAddressRepository } from '@/modules/address/domain/address.repository.interface';
import { Address } from '@/modules/address/domain/address.entity';
import { PrismaClient } from '@prisma/client';
import { AddressMapper } from '@/modules/address/infrastructure/address.mapper';

export class PrismaAddressRepository implements IAddressRepository {
    constructor(private readonly prisma: PrismaClient) {}
  async findById(id: string): Promise<Address | null> {
    const address = await this.prisma.address.findUnique({ where: { id } });
    return address ? AddressMapper.toDomain(address) : null;
  }

  async findAll(): Promise<Address[]> {
    const addresses = await this.prisma.address.findMany();
    return addresses.map(AddressMapper.toDomain);
  }

  async save(address: Address): Promise<void> {
    const data = AddressMapper.toPersistence(address);
    await this.prisma.address.upsert({
      where: { id: address.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.address.delete({ where: { id } });
  }
}