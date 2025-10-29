export interface IRepository<T> {
  findById(id: string): Promise<T | null>;
  findAll(page: number, pageSize: number): Promise<T[]>;
  save(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}
