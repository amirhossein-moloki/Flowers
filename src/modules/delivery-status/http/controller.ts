import { Request, Response } from 'express';
import { z } from 'zod';
import { DeliveryStatusPresenter } from './presenters/delivery-status.presenter';
import { GetDeliveryStatusUseCase } from '../application/use-cases/get-delivery-status.usecase';
import { ListDeliveryStatusesUseCase } from '../application/use-cases/list-delivery-statuses.usecase';

export class DeliveryStatusController {
  constructor(
    private readonly getDeliveryStatusUseCase: GetDeliveryStatusUseCase,
    private readonly listDeliveryStatusesUseCase: ListDeliveryStatusesUseCase,
  ) {}

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.getDeliveryStatusUseCase.execute(id);

    if (result.success) {
      return res.status(200).json(DeliveryStatusPresenter.toJSON(result.value));
    } else {
      return res.status(404).json({ error: result.error.message });
    }
  }

  async list(req: Request, res: Response) {
    const result = await this.listDeliveryStatusesUseCase.execute();

    if (result.success) {
      const deliveryStatusesJSON = result.value.map(DeliveryStatusPresenter.toJSON);
      return res.status(200).json(deliveryStatusesJSON);
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
