import { Result } from '@/core/utils/result';
import { ProofOfDeliveryRepository } from '../../domain/proof-of-delivery.repository';

export class DeleteProofOfDeliveryUseCase {
  constructor(private readonly repository: ProofOfDeliveryRepository) {}

  async execute(id: string): Promise<Result<void, Error>> {
    return this.repository.delete(id);
  }
}
