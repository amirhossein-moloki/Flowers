import { Entity } from '@/core/domain/entity';
import { Result, success } from '@/core/utils/result';

export interface IProofOfDeliveryProps {
  delivery_id: string;
  signature_url?: string;
  photo_url?: string;
  notes?: string;
  is_verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ProofOfDelivery extends Entity<IProofOfDeliveryProps> {
  private constructor(props: IProofOfDeliveryProps, id?: string) {
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

  get is_verified(): boolean {
    return this.props.is_verified ?? false;
  }

  public static create(props: IProofOfDeliveryProps, id?: string): Result<ProofOfDelivery, Error> {
    const proofOfDelivery = new ProofOfDelivery(
      {
        ...props,
        is_verified: props.is_verified ?? false,
      },
      id,
    );
    return success(proofOfDelivery);
  }
}
