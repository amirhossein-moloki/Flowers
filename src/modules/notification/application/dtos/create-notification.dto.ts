import { IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsString()
  recipient: string;

  constructor(title: string, message: string, recipient: string) {
    this.title = title;
    this.message = message;
    this.recipient = recipient;
  }
}
