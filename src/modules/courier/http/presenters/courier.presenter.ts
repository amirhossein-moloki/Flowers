import { CourierDto } from '@/modules/courier/application/dtos/courier.dto';

export class CourierPresenter {
  static toJSON(courier: CourierDto) {
    return {
      id: courier.id,
      name: courier.name,
      phone: courier.phone,
      email: courier.email,
      vehicle: courier.vehicle,
      isAvailable: courier.isAvailable,
      createdAt: courier.createdAt,
      updatedAt: courier.updatedAt,
    };
  }
}