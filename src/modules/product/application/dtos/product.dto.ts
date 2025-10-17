export class ProductDto {
  id: string;
  vendor_id: string;
  name: string;
  sku_code: string;
  description: string;
  base_price: number;
  prep_time_min: number;
  is_active: boolean;
  photo_url: string;
}