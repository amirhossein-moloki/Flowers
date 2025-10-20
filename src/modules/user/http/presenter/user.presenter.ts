import { User } from '@/modules/user/domain/user.entity';

export class UserPresenter {
  static toHttp(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.props.createdAt,
    };
  }
}
