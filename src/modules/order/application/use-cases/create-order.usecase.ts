import { IOrderRepository } from '../../domain/order.repository';
import { Order, IOrderProps, OrderItem, OrderStatus } from '../../domain/order.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderDto } from '../dtos/order.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { OrderMapper } from '../../infrastructure/order.mapper';

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(dto: CreateOrderDto): Promise<Result<OrderDto, HttpError>> {
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
      return failure(HttpError.badRequest(combinedResult.error.message));
    }
    const orderItems = combinedResult.value as OrderItem[];

    const total = orderItems.reduce((acc, item) => acc + item.props.price * item.props.quantity, 0);

    const orderProps: IOrderProps = {
      ...dto,
      status: OrderStatus.PENDING,
      total,
      items: orderItems,
    };

    const orderResult = Order.create(orderProps);
    if (!orderResult.success) {
      return failure(HttpError.internalServerError(orderResult.error.message));
    }
    const order = orderResult.value;

    await this.orderRepository.save(order);

    const orderDto = OrderMapper.toDto(order);
    return success(orderDto);
  }
}
