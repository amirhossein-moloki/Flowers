import { ICourierRepository } from '@/modules/courier/domain/courier.repository';
import { Courier } from '@/modules/courier/domain/courier.entity';
import prisma from '@/infrastructure/database/prisma/prisma-client';
import { CourierMapper } from '@/modules/courier/infrastructure/courier.mapper';

export class PrismaCourierRepository implements ICourierRepository {
  async findById(id: string): Promise<Courier | null> {
    const courier = await prisma.courier.findUnique({ where: { id } });
    return courier ? CourierMapper.toDomain(courier) : null;
  }

  async findByEmail(email: string): Promise<Courier | null> {
    const courier = await prisma.courier.findUnique({ where: { email } });
    return courier ? CourierMapper.toDomain(courier) : null;
  }

  async findAll(page: number, pageSize: number): Promise<Courier[]> {
    const couriers = await prisma.courier.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return couriers.map(CourierMapper.toDomain);
  }

  async save(courier: Courier): Promise<void> {
    const data = CourierMapper.toPersistence(courier);
    await prisma.courier.upsert({
      where: { id: courier.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.courier.delete({ where: { id } });
  }
}