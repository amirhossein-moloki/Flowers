import { ProofOfDelivery } from '../../../domain/proof-of-delivery.entity';

export class ProofOfDeliveryPresenter {
  static toJSON(proofOfDelivery: ProofOfDelivery) {
    return {
      id: proofOfDelivery.id,
      delivery_id: proofOfDelivery.delivery_id,
      signature_url: proofOfDelivery.signature_url,
      photo_url: proofOfDelivery.photo_url,
      notes: proofOfDelivery.notes,
      is_verified: proofOfDelivery.is_verified,
    };
  }
}
