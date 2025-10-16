import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';

interface ProofOfDeliveryProps {
  delivery_id: string;
  photo_url: string;
  receiver_name: string;
  receiver_signature_url: string;
  otp_code: string;
  created_at?: Date;
}

export class ProofOfDelivery extends Entity<ProofOfDeliveryProps> {
  private constructor(props: ProofOfDeliveryProps, id?: string) {
    super(props, id);
  }

  get delivery_id(): string {
    return this.props.delivery_id;
  }

  get photo_url(): string {
    return this.props.photo_url;
  }

  get receiver_name(): string {
    return this.props.receiver_name;
  }

  get receiver_signature_url(): string {
    return this.props.receiver_signature_url;
  }

  get otp_code(): string {
    return this.props.otp_code;
  }

  public static create(
    props: ProofOfDeliveryProps,
    id?: string,
  ): Result<ProofOfDelivery, Error> {
    const proofOfDelivery = new ProofOfDelivery(props, id);
    return success(proofOfDelivery);
  }
}