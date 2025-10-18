import { ProofOfDelivery as PrismaProofOfDelivery } from '@prisma/client';
import { ProofOfDelivery } from '../domain/proof-of-delivery.entity';

export class ProofOfDeliveryMapper {
  static toDomain(
    prismaProofOfDelivery: PrismaProofOfDelivery,
  ): ProofOfDelivery {
    const proofOfDeliveryResult = ProofOfDelivery.create(
      {
        delivery_id: prismaProofOfDelivery.delivery_id,
        photo_url: prismaProofOfDelivery.photo_url,
        receiver_name: prismaProofOfDelivery.receiver_name,
        receiver_signature_url: prismaProofOfDelivery.receiver_signature_url,
        otp_code: prismaProofOfDelivery.otp_code,
        created_at: prismaProofOfDelivery.created_at,
      },
      prismaProofOfDelivery.id,
    );
    if (proofOfDeliveryResult.isFailure) {
      throw new Error('Could not map PrismaProofOfDelivery to domain');
    }
    return proofOfDeliveryResult.value;
  }

  static toPersistence(
    proofOfDelivery: ProofOfDelivery,
  ): PrismaProofOfDelivery {
    return {
      id: proofOfDelivery.id,
      delivery_id: proofOfDelivery.delivery_id,
      photo_url: proofOfDelivery.photo_url,
      receiver_name: proofOfDelivery.receiver_name,
      receiver_signature_url: proofOfDelivery.receiver_signature_url,
      otp_code: proofOfDelivery.otp_code,
      created_at: proofOfDelivery.props.created_at || new Date(),
      updated_at: new Date(),
    };
  }
}