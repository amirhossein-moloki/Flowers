import { ProofOfDelivery } from '../../domain/proof-of-delivery.entity';
import { Result } from '@/core/utils/result';
import { ProofOfDeliveryRepository } from '../../domain/proof-of-delivery.repository';

export class UpdateProofOfDeliveryUseCase {
  constructor(private readonly repository: ProofOfDeliveryRepository) {}

  async execute(
    data: UpdateProofOfDeliveryDTO
  ): Promise<Result<ProofOfDelivery, Error>> {
    const proofOfDelivery = ProofOfDelivery.create(data);
    if (proofOfDelivery.isFailure()) {
      return proofOfDelivery;
    }

    const proofOfDeliveryEntity = proofOfDelivery.value;
    if (!proofOfDeliveryEntity) {
      return Result.failure(new Error('Failed to create proof of delivery'));
    }

    return this.repository.update(data.id, proofOfDeliveryEntity);
  }
}

interface UpdateProofOfDeliveryDTO {
  id: string;
  delivery_id: string;
  signature_url?: string;
  photo_url?: string;
  notes?: string;
  is_verified?: boolean;
}
