import { Notification } from './notification.entity';

export interface INotificationRepository {
  findById(id: string): Promise<Notification | null>;
  findAll(): Promise<Notification[]>;
  save(notification: Notification): Promise<Notification>;
  delete(id: string): Promise<void>;
}