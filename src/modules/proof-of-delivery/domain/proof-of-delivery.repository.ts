import { ProofOfDelivery } from './proof-of-delivery.entity';

export interface IProofOfDeliveryRepository {
  findById(id: string): Promise<ProofOfDelivery | null>;
  findAll(): Promise<ProofOfDelivery[]>;
  save(proofOfDelivery: ProofOfDelivery): Promise<void>;
  delete(id: string): Promise<void>;
}