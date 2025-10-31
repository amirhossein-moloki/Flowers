import { IOrderRepository } from '@/modules/order/domain/order.repository';
import { Order, IOrderProps, OrderItem, OrderStatus } from '@/modules/order/domain/order.entity';
import { CreateOrderDto } from '@/modules/order/application/dtos/create-order.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(dto: CreateOrderDto): Promise<Result<Order, HttpError>> {
    const orderItemsResult = dto.items.map((item) =>
      OrderItem.create({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        orderId: '',
      }),
    );

    const combinedResult = Result.combine(orderItemsResult);
    if (!combinedResult.success) {
      return failure(HttpError.badRequest(combinedResult.error));
    }
    const orderItems = combinedResult.value;

    const total = orderItems.reduce((acc, item) => acc + item.props.price * item.props.quantity, 0);

    const orderProps: IOrderProps = {
      userId: dto.userId,
      status: OrderStatus.PENDING,
      total,
      items: orderItems,
    };

    const orderResult = Order.create(orderProps);
    if (!orderResult.success) {
      return failure(HttpError.internalServerError(orderResult.error));
    }
    const order = orderResult.value;

    await this.orderRepository.save(order);

    return success(order);
  }
}
