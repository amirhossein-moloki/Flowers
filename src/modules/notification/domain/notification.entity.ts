import { Entity } from '@/core/domain/entity';
import { Result, success } from '@/core/utils/result';

interface NotificationProps {
  title: string;
  message: string;
  recipient: string;
  createdAt?: Date;
}

export class Notification extends Entity<NotificationProps> {
  private constructor(props: NotificationProps, id?: string) {
    super(props, id);
  }

  get title(): string {
    return this.props.title;
  }

  get message(): string {
    return this.props.message;
  }

  get recipient(): string {
    return this.props.recipient;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  public static create(
    props: NotificationProps,
    id?: string,
  ): Result<Notification, Error> {
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return success(notification);
  }
}
