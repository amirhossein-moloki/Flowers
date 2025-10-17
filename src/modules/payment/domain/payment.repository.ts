import { Payment } from './payment.entity';

export interface IPaymentRepository {
  findById(id: string): Promise<Payment | null>;
  findAll(): Promise<Payment[]>;
  save(payment: Payment): Promise<void>;
  delete(id: string): Promise<void>;
}