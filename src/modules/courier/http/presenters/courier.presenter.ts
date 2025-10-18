import { Courier } from '@/modules/courier/domain/courier.entity';

export class CourierPresenter {
  static toJSON(courier: Courier) {
    return {
      id: courier.id,
      name: courier.name,
      phone: courier.phone,
      email: courier.email,
      vehicle: courier.vehicle,
      isAvailable: courier.isAvailable,
      createdAt: courier.props.createdAt,
      updatedAt: courier.props.updatedAt,
    };
  }
}