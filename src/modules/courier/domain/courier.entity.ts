import { Entity } from '@/core/domain/entity';
import { Result, success, failure } from '@/core/utils/result';

export class CourierCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CourierCreationError';
  }
}

export interface ICourierProps {
  name: string;
  phone: string;
  email: string;
  vehicle?: string | null;
  isAvailable?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Courier extends Entity<ICourierProps> {
  private constructor(props: ICourierProps, id?: string) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get phone(): string {
    return this.props.phone;
  }

  get email(): string {
    return this.props.email;
  }

  get vehicle(): string | null {
    return this.props.vehicle ?? null;
  }

  get isAvailable(): boolean {
    return this.props.isAvailable ?? true;
  }

  public static create(props: ICourierProps, id?: string): Result<Courier, CourierCreationError> {
    if (!props.name || !props.phone || !props.email) {
      return failure(new CourierCreationError('Courier name, phone, and email cannot be empty.'));
    }
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(props.email)) {
        return failure(new CourierCreationError('Invalid email format.'));
    }

    const courier = new Courier(
      {
        ...props,
        vehicle: props.vehicle ?? null,
        isAvailable: props.isAvailable ?? true,
      },
      id,
    );
    return success(courier);
  }
}