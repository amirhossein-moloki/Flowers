import { IOrderRepository } from '../../domain/order.repository';
import { Order } from '../../domain/order.entity';
import { OrderItem } from '../../domain/order-item.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { IUserRepository } from '../../../user/domain/user.repository';

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly userRepository: IUserRepository, // Example of cross-module dependency
  ) {}

  async execute(dto: CreateOrderDto): Promise<Result<Order, HttpError>> {
    const user = await this.userRepository.findById(dto.userId);
    if (!user) {
      return failure(HttpError.notFound('User not found.'));
    }

    const orderItems = dto.items.map((item) => {
      const orderItemResult = OrderItem.create({ ...item, orderId: '' }); // temp orderId
      if (!orderItemResult.success) {
        throw new Error('Failed to create order item'); // Or handle more gracefully
      }
      return orderItemResult.value;
    });

    const total = orderItems.reduce(
      (acc, item) => acc + item.props.price * item.props.quantity,
      0,
    );

    const orderResult = Order.create({
      userId: dto.userId,
      items: orderItems,
      total,
      status: 'pending',
    });

    if (!orderResult.success) {
      return failure(HttpError.internalServerError(orderResult.error.message));
    }

    const order = orderResult.value;
    await this.orderRepository.save(order);

    return success(order);
  }
}