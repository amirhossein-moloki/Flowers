import { ProofOfDelivery as PrismaProofOfDelivery, Prisma } from '@prisma/client';
import { ProofOfDelivery } from '../domain/proof-of-delivery.entity';

export class ProofOfDeliveryMapper {
  static toDomain(
    prismaProofOfDelivery: PrismaProofOfDelivery,
  ): ProofOfDelivery {
    const proofOfDeliveryResult = ProofOfDelivery.create(
      {
        delivery_id: prismaProofOfDelivery.delivery_id,
        signature_url: prismaProofOfDelivery.signature_url ?? undefined,
        photo_url: prismaProofOfDelivery.photo_url ?? undefined,
        notes: prismaProofOfDelivery.notes ?? undefined,
        is_verified: prismaProofOfDelivery.is_verified,
        createdAt: prismaProofOfDelivery.created_at,
        updatedAt: prismaProofOfDelivery.updated_at,
      },
      prismaProofOfDelivery.id,
    );

    if (!proofOfDeliveryResult.success) {
      throw new Error('Could not map PrismaProofOfDelivery to domain');
    }
    return proofOfDeliveryResult.value;
  }

  static toPersistence(
    proofOfDelivery: ProofOfDelivery,
  ): Prisma.ProofOfDeliveryCreateInput {
    return {
      id: proofOfDelivery.id,
      delivery: { connect: { id: proofOfDelivery.delivery_id } },
      signature_url: proofOfDelivery.signature_url,
      photo_url: proofOfDelivery.photo_url,
      notes: proofOfDelivery.notes,
      is_verified: proofOfDelivery.is_verified,
    };
  }
}
