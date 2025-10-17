import { Order as PrismaOrder, OrderItem as PrismaOrderItem } from '@prisma/client';
import { Order } from '../domain/order.entity';
import { OrderItem } from '../domain/order-item.entity';
import { OrderDto } from '../application/dtos/order.dto';
import { OrderItemDto } from '../application/dtos/order-item.dto';

// Type that represents the result of a Prisma query including relations
type PrismaOrderWithItems = PrismaOrder & { items?: PrismaOrderItem[] };

export class OrderMapper {
  /**
   * Converts a Prisma query result to a domain Order entity.
   */
  public static toDomain(raw: PrismaOrderWithItems): Order {
    const orderItems = (raw.items || []).map((item) => {
      const itemResult = OrderItem.create(
        {
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price.toNumber(),
        },
        item.id,
      );
      // In a real app, you might want to handle failure more robustly
      if (!itemResult.success) throw new Error('Failed to create order item from raw data');
      return itemResult.value;
    });

    const orderResult = Order.create(
      {
        customer_id: raw.customer_id,
        vendor_id: raw.vendor_id,
        outlet_id: raw.outlet_id,
        status_id: raw.status_id,
        customer_address_id: raw.customer_address_id,
        delivery_window_id: raw.delivery_window_id,
        note: raw.note,
        subtotal: raw.subtotal.toNumber(),
        delivery_fee: raw.delivery_fee?.toNumber(),
        service_fee: raw.service_fee?.toNumber(),
        discount_total: raw.discount_total?.toNumber(),
        tax_total: raw.tax_total?.toNumber(),
        total_payable: raw.total_payable.toNumber(),
        currency: raw.currency,
        scheduled_at: raw.scheduled_at,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
        items: orderItems,
      },
      raw.id,
    );

    if (!orderResult.success) {
      // This indicates a mismatch between DB data and domain rules
      throw new Error(`Failed to create domain entity from raw data: ${orderResult.error.message}`);
    }
    return orderResult.value;
  }

  /**
   * Converts a domain Order entity to a format suitable for Prisma.
   */
  public static toPersistence(order: Order) {
    const props = order.props;
    return {
      id: order.id,
      customer_id: props.customer_id,
      vendor_id: props.vendor_id,
      outlet_id: props.outlet_id,
      status_id: props.status_id,
      customer_address_id: props.customer_address_id,
      delivery_window_id: props.delivery_window_id,
      note: props.note,
      subtotal: props.subtotal,
      delivery_fee: props.delivery_fee,
      service_fee: props.service_fee,
      discount_total: props.discount_total,
      tax_total: props.tax_total,
      total_payable: props.total_payable,
      currency: props.currency,
      scheduled_at: props.scheduled_at,
      // created_at and updated_at are managed by the DB
    };
  }

  /**
   * Converts a domain Order entity to a public-facing DTO.
   */
  public static toDto(order: Order): OrderDto {
    const props = order.props;
    const itemDtos = (props.items || []).map(
      (item): OrderItemDto => ({
        id: item.id,
        product_id: item.props.product_id,
        // In a real app, you might fetch the product name from a product service
        product_name: 'Product Name Placeholder',
        quantity: item.props.quantity,
        price: item.props.price,
        total: item.props.quantity * item.props.price,
      }),
    );

    return {
      id: order.id,
      customer_id: props.customer_id,
      vendor_id: props.vendor_id,
      outlet_id: props.outlet_id,
      status_id: props.status_id,
      note: props.note,
      subtotal: props.subtotal,
      delivery_fee: props.delivery_fee,
      service_fee: props.service_fee,
      discount_total: props.discount_total,
      tax_total: props.tax_total,
      total_payable: props.total_payable,
      currency: props.currency,
      scheduled_at: props.scheduled_at,
      created_at: props.created_at,
      items: itemDtos,
    };
  }
}