import { Entity } from '../../../core/domain/entity';
import { Result, success } from '../../../core/utils/result';

interface ProofOfDeliveryProps {
  delivery_id: string;
  signature_url?: string;
  photo_url?: string;
  notes?: string;
  is_verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export class ProofOfDelivery extends Entity<ProofOfDeliveryProps> {
  private constructor(props: ProofOfDeliveryProps, id?: string) {
    super(props, id);
  }

  get delivery_id(): string {
    return this.props.delivery_id;
  }

  get signature_url(): string | undefined {
    return this.props.signature_url;
  }

  get photo_url(): string | undefined {
    return this.props.photo_url;
  }

  get notes(): string | undefined {
    return this.props.notes;
  }

  get is_verified(): boolean | undefined {
    return this.props.is_verified;
  }

  public static create(
    props: ProofOfDeliveryProps,
    id?: string,
  ): Result<ProofOfDelivery, Error> {
    const proofOfDelivery = new ProofOfDelivery(props, id);
    return success(proofOfDelivery);
  }
}