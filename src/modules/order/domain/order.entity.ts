import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';
import { OrderItem } from './order-item.entity';

interface OrderProps {
  customer_id: string;
  vendor_id: string;
  outlet_id: string;
  status_id: string;
  customer_address_id: string;
  delivery_window_id: string;
  note: string;
  subtotal: number;
  delivery_fee?: number;
  service_fee?: number;
  discount_total?: number;
  tax_total?: number;
  total_payable: number;
  currency?: string;
  scheduled_at: Date;
  created_at?: Date;
  updated_at?: Date;
  items?: OrderItem[];
}

export class Order extends Entity<OrderProps> {
  private constructor(props: OrderProps, id?: string) {
    super(props, id);
  }

  get customer_id(): string {
    return this.props.customer_id;
  }

  get vendor_id(): string {
    return this.props.vendor_id;
  }

  get outlet_id(): string {
    return this.props.outlet_id;
  }

  get status_id(): string {
    return this.props.status_id;
  }

  get customer_address_id(): string {
    return this.props.customer_address_id;
  }

  get delivery_window_id(): string {
    return this.props.delivery_window_id;
  }

  get note(): string {
    return this.props.note;
  }

  get subtotal(): number {
    return this.props.subtotal;
  }

  get delivery_fee(): number {
    return this.props.delivery_fee;
  }

  get service_fee(): number {
    return this.props.service_fee;
  }

  get discount_total(): number {
    return this.props.discount_total;
  }

  get tax_total(): number {
    return this.props.tax_total;
  }

  get total_payable(): number {
    return this.props.total_payable;
  }

  get currency(): string {
    return this.props.currency;
  }

  get scheduled_at(): Date {
    return this.props.scheduled_at;
  }

  get items(): OrderItem[] {
    return this.props.items;
  }

  public static create(props: OrderProps, id?: string): Result<Order, Error> {
    const order = new Order(
      {
        ...props,
        delivery_fee: props.delivery_fee ?? 0,
        service_fee: props.service_fee ?? 0,
        discount_total: props.discount_total ?? 0,
        tax_total: props.tax_total ?? 0,
        currency: props.currency ?? 'IRR',
        items: props.items ?? [],
      },
      id,
    );
    return success(order);
  }
}