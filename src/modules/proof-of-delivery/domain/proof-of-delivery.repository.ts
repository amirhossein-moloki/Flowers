import { ProofOfDelivery } from './proof-of-delivery.entity';
import { Result } from '@/core/utils/result';

export interface ProofOfDeliveryRepository {
  create(data: ProofOfDelivery): Promise<Result<ProofOfDelivery, Error>>;
  findById(id: string): Promise<Result<ProofOfDelivery, Error>>;
  update(id: string, data: ProofOfDelivery): Promise<Result<ProofOfDelivery, Error>>;
  delete(id: string): Promise<Result<void, Error>>;
}
