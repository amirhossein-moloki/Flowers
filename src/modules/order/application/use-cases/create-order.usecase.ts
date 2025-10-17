import { IOrderRepository } from '../../domain/order.repository';
import { Order, IOrderProps } from '../../domain/order.entity';
import { OrderItem } from '../../domain/order-item.entity';
import { CreateOrderDto, CreateOrderItemDto } from '../dtos/create-order.dto';
import { OrderDto } from '../dtos/order.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { OrderMapper } from '../../infrastructure/order.mapper'; // Assuming a mapper exists to convert to DTO

// Note: In a real app, you'd inject services for these, e.g., ICustomerValidator, IVendorValidator
import { IUserRepository } from '../../../user/domain/user.repository';
import { IVendorRepository } from '../../../vendor/domain/vendor.repository';

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly userRepository: IUserRepository, // Example of cross-module dependency
    private readonly vendorRepository: IVendorRepository, // Example
  ) {}

  async execute(dto: CreateOrderDto): Promise<Result<OrderDto, HttpError>> {
    // 1. Validate existence of related entities (can be a separate validation step)
    const customer = await this.userRepository.findById(dto.customer_id);
    if (!customer) {
      return failure(HttpError.notFound('Customer not found.'));
    }
    const vendor = await this.vendorRepository.findById(dto.vendor_id);
    if (!vendor) {
      return failure(HttpError.notFound('Vendor not found.'));
    }
    // ... other validations for outlet, address, etc.

    // 2. Create OrderItem entities from DTO
    const orderItemsResult = dto.items.map((item) =>
      OrderItem.create({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }),
    );

    const combinedResult = Result.combine(orderItemsResult);
    if (!combinedResult.success) {
      return failure(HttpError.badRequest(combinedResult.error.message));
    }
    const orderItems = combinedResult.value as OrderItem[];

    // 3. Calculate totals
    const subtotal = orderItems.reduce((acc, item) => acc + item.props.price * item.props.quantity, 0);
    // In a real app, these would be calculated by a pricing service
    const delivery_fee = 5; // Placeholder
    const service_fee = 2;  // Placeholder
    const total_payable = subtotal + delivery_fee + service_fee;

    // 4. Create the Order aggregate root
    const orderProps: IOrderProps = {
      ...dto,
      scheduled_at: new Date(dto.scheduled_at),
      status_id: 'pending', // Initial status
      subtotal,
      delivery_fee,
      service_fee,
      total_payable,
      items: orderItems,
    };

    const orderResult = Order.create(orderProps);
    if (!orderResult.success) {
      return failure(HttpError.internalServerError(orderResult.error.message));
    }
    const order = orderResult.value;

    // 5. Persist the order
    await this.orderRepository.save(order);

    // 6. Return a DTO to the presentation layer
    const orderDto = OrderMapper.toDto(order);
    return success(orderDto);
  }
}