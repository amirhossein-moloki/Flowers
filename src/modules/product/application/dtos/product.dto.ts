export class ProductDto {
  id!: string;
  name!: string;
  description!: string | null;
  price!: number;
  stock!: number;
  vendorId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
