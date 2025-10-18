import { IProofOfDeliveryRepository } from '../domain/proof-of-delivery.repository';
import { ProofOfDelivery } from '../domain/proof-of-delivery.entity';
import prisma from '../../../infrastructure/database/prisma/prisma-client';
import { ProofOfDeliveryMapper } from './proof-of-delivery.mapper';

export class PrismaProofOfDeliveryRepository implements IProofOfDeliveryRepository {
  async findById(id: string): Promise<ProofOfDelivery | null> {
    const proofOfDelivery = await prisma.proofOfDelivery.findUnique({ where: { id } });
    return proofOfDelivery ? ProofOfDeliveryMapper.toDomain(proofOfDelivery) : null;
  }

  async findAll(): Promise<ProofOfDelivery[]> {
    const proofOfDeliveries = await prisma.proofOfDelivery.findMany();
    return proofOfDeliveries.map(ProofOfDeliveryMapper.toDomain);
  }

  async save(proofOfDelivery: ProofOfDelivery): Promise<void> {
    const data = ProofOfDeliveryMapper.toPersistence(proofOfDelivery);
    await prisma.proofOfDelivery.upsert({
      where: { id: proofOfDelivery.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.proofOfDelivery.delete({ where: { id } });
  }
}