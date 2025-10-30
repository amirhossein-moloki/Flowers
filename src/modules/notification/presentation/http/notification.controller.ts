import { Request, Response } from 'express';
import { CreateNotificationUseCase } from '../../application/use-cases/create-notification.usecase';
import { GetNotificationUseCase } from '../../application/use-cases/get-notification.usecase';
import { UpdateNotificationUseCase } from '../../application/use-cases/update-notification.usecase';
import { DeleteNotificationUseCase } from '../../application/use-cases/delete-notification.usecase';

export class NotificationController {
  constructor(
    private readonly createNotification: CreateNotificationUseCase,
    private readonly getNotification: GetNotificationUseCase,
    private readonly updateNotification: UpdateNotificationUseCase,
    private readonly deleteNotification: DeleteNotificationUseCase,
  ) {}

  async create(req: Request, res: Response) {
    const result = await this.createNotification.execute(req.body);

    if (result.success) {
      res.status(201).json(result.value);
    } else {
      res.status(400).json({ error: result.error.message });
    }
  }

  async find(req: Request, res: Response) {
    const result = await this.getNotification.execute(req.params.id);

    if (result.success) {
      if (!result.value) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      res.status(200).json(result.value);
    } else {
      res.status(404).json({ error: result.error.message });
    }
  }

  async update(req: Request, res: Response) {
    const result = await this.updateNotification.execute(req.params.id, req.body);

    if (result.success) {
      res.status(200).json(result.value);
    } else {
      res.status(result.error.statusCode).json({ error: result.error.message });
    }
  }

  async delete(req: Request, res: Response) {
    const result = await this.deleteNotification.execute(req.params.id);

    if (result.success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: result.error.message });
    }
  }
}
