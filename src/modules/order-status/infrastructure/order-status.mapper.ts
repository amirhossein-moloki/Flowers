import { OrderStatus } from '../domain/order-status.entity';
import { OrderStatusDto } from '../application/dtos/order-status.dto';

export class OrderStatusMapper {
  static toDto(orderStatus: OrderStatus): OrderStatusDto {
    return {
      id: orderStatus.id,
      code: orderStatus.code,
      name: orderStatus.name,
      display_order: orderStatus.display_order,
      is_terminal: orderStatus.is_terminal,
    };
  }

  static toDomain(dto: OrderStatusDto): OrderStatus {
    const result = OrderStatus.create({
      code: dto.code,
      name: dto.name,
      display_order: dto.display_order,
      is_terminal: dto.is_terminal,
    }, dto.id);

    if (result.success) {
      return result.value;
    } else {
      throw result.error;
    }
  }

  static toPersistence(orderStatus: OrderStatus): any {
    return {
      id: orderStatus.id,
      code: orderStatus.code,
      name: orderStatus.name,
      display_order: orderStatus.display_order,
      is_terminal: orderStatus.is_terminal,
    };
  }
}