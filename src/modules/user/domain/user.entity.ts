import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';
import { UserRole } from '../../../../core/domain/enums';

export interface IUserProps {
  username: string;
  full_name: string;
  phone: string;
  email: string;
  role: UserRole;
  is_active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Entity<IUserProps> {
  private constructor(props: IUserProps, id?: string) {
    super(props, id);
  }

  get username(): string {
    return this.props.username;
  }

  get full_name(): string {
    return this.props.full_name;
  }

  get phone(): string {
    return this.props.phone;
  }

  get email(): string {
    return this.props.email;
  }

  get role(): UserRole {
    return this.props.role;
  }

  get is_active(): boolean {
    return this.props.is_active;
  }

  public static create(props: IUserProps, id?: string): Result<User, Error> {
    const user = new User(
      {
        ...props,
        is_active: props.is_active ?? true,
      },
      id,
    );
    return success(user);
  }
}