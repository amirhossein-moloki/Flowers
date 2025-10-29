export interface NotificationDto {
  id: string;
  title: string;
  message: string;
  recipient: string;
  createdAt?: Date;
}
