import { IRepository } from '../../../../core/domain/repository';
import { Product } from './product.entity';

export interface IProductRepository extends IRepository<Product> {
  findById(id: string): Promise<Product | null>;
  findAll(page: number, pageSize: number): Promise<Product[]>;
  findByName(name: string): Promise<Product | null>;
  save(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}