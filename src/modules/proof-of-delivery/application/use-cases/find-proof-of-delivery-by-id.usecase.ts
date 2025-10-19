import { ProofOfDelivery } from '../../domain/proof-of-delivery.entity';
import { Result } from '@/core/utils/result';
import { ProofOfDeliveryRepository } from '../../domain/proof-of-delivery.repository';

export class FindProofOfDeliveryByIdUseCase {
  constructor(private readonly repository: ProofOfDeliveryRepository) {}

  async execute(id: string): Promise<Result<ProofOfDelivery, Error>> {
    return this.repository.findById(id);
  }
}
