export class ProductImageDto {
  id: string;
  product_id: string;
  url: string;
  sort_order: number;

  constructor(id: string, product_id: string, url: string, sort_order: number) {
    this.id = id;
    this.product_id = product_id;
    this.url = url;
    this.sort_order = sort_order;
  }
}