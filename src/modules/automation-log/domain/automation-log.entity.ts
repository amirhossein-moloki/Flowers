import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';

interface AutomationLogProps {
  order_id: string;
  action: string;
  status: string;
  message: string;
  executed_at: Date;
}

export class AutomationLog extends Entity<AutomationLogProps> {
  private constructor(props: AutomationLogProps, id?: string) {
    super(props, id);
  }

  get order_id(): string {
    return this.props.order_id;
  }

  get action(): string {
    return this.props.action;
  }

  get status(): string {
    return this.props.status;
  }

  get message(): string {
    return this.props.message;
  }

  get executed_at(): Date {
    return this.props.executed_at;
  }

  public static create(
    props: AutomationLogProps,
    id?: string,
  ): Result<AutomationLog, Error> {
    const automationLog = new AutomationLog(props, id);
    return success(automationLog);
  }
}