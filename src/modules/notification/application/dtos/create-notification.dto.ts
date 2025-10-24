import { IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsString()
  recipient: string;
}
