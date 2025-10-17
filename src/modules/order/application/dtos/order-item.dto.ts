export interface OrderItemDto {
  id: string;
  product_id: string;
  product_name: string; // Example of denormalized data for client convenience
  quantity: number;
  price: number;
  total: number;
}