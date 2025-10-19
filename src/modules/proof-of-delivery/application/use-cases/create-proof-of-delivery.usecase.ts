import { ProofOfDelivery } from '../../domain/proof-of-delivery.entity';
import { Result } from '@/core/utils/result';
import { ProofOfDeliveryRepository } from '../../domain/proof-of-delivery.repository';

export class CreateProofOfDeliveryUseCase {
  constructor(private readonly repository: ProofOfDeliveryRepository) {}

  async execute(
    data: CreateProofOfDeliveryDTO
  ): Promise<Result<ProofOfDelivery, Error>> {
    const proofOfDelivery = ProofOfDelivery.create(data);
    if (proofOfDelivery.success === false) {
      return proofOfDelivery;
    }
    return this.repository.create(proofOfDelivery.value);
  }
}

interface CreateProofOfDeliveryDTO {
  delivery_id: string;
  signature_url?: string;
  photo_url?: string;
  notes?: string;
}
