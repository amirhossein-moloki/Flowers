import { User } from '@/modules/user/domain/user.entity';

export class UserPresenter {
  static toJSON(user: User) {
    return {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      is_active: user.is_active,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}