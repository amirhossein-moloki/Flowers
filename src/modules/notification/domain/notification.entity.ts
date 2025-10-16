import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';
import { NotificationChannel } from '../../../../core/domain/enums';

interface NotificationProps {
  user_id: string;
  order_id: string;
  channel: NotificationChannel;
  template: string;
  payload_json: any;
  status?: string;
  sent_at: Date;
}

export class Notification extends Entity<NotificationProps> {
  private constructor(props: NotificationProps, id?: string) {
    super(props, id);
  }

  get user_id(): string {
    return this.props.user_id;
  }

  get order_id(): string {
    return this.props.order_id;
  }

  get channel(): NotificationChannel {
    return this.props.channel;
  }

  get template(): string {
    return this.props.template;
  }

  get payload_json(): any {
    return this.props.payload_json;
  }

  get status(): string {
    return this.props.status;
  }

  get sent_at(): Date {
    return this.props.sent_at;
  }

  public static create(
    props: NotificationProps,
    id?: string,
  ): Result<Notification, Error> {
    const notification = new Notification(
      {
        ...props,
        status: props.status ?? 'sent',
      },
      id,
    );
    return success(notification);
  }
}