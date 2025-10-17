import { OrderItemDto } from './order-item.dto';

export interface OrderDto {
  id: string;
  customer_id: string;
  vendor_id: string;
  outlet_id: string;
  status_id: string;
  note: string;
  subtotal: number;
  delivery_fee: number;
  service_fee: number;
  discount_total: number;
  tax_total: number;
  total_payable: number;
  currency: string;
  scheduled_at: Date;
  created_at: Date;
  items: OrderItemDto[];
}