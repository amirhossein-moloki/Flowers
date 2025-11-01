import { Entity } from '@/core/domain/entity';
import { Result, success } from '@/core/utils/result';
import { UserRole } from '@prisma/client';
export { UserRole };

export interface IUserProps {
  id?: string;
  username: string;
  email:string;
  role: UserRole;
  password?: string;
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

  get password(): string | undefined {
    return this.props.password;
  }


  get email(): string {
    return this.props.email;
  }

  get role(): UserRole {
    return this.props.role;
  }

  public static create(props: IUserProps, id?: string): Result<User, Error> {
    const user = new User(
      {
        ...props,
      },
      id,
    );
    return success(user);
  }
}