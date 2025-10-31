import { Request, Response } from 'express';
import { z } from 'zod';
import {
  CreateDeliveryDTO,
  createDeliverySchema,
} from './dto/create-delivery.schema';
import {
  UpdateDeliveryDTO,
  updateDeliverySchema,
} from './dto/update-delivery.schema';
import { DeliveryPresenter } from './presenters/delivery.presenter';
import { CreateDeliveryUseCase } from '../application/use-cases/create-delivery.usecase';
import { GetDeliveryUseCase } from '../application/use-cases/get-delivery.usecase';
import { UpdateDeliveryUseCase } from '../application/use-cases/update-delivery.usecase';
import { DeleteDeliveryUseCase } from '../application/use-cases/delete-delivery.usecase';
import { ListDeliveriesUseCase } from '../application/use-cases/list-deliveries.usecase';

export class DeliveryController {
  constructor(
    private readonly createDeliveryUseCase: CreateDeliveryUseCase,
    private readonly getDeliveryUseCase: GetDeliveryUseCase,
    private readonly updateDeliveryUseCase: UpdateDeliveryUseCase,
    private readonly deleteDeliveryUseCase: DeleteDeliveryUseCase,
    private readonly listDeliveriesUseCase: ListDeliveriesUseCase,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const deliveryDTO = createDeliverySchema.parse(req.body);
      const result = await this.createDeliveryUseCase.execute(deliveryDTO);

      if (result.isSuccess()) {
        return res.status(201).json(DeliveryPresenter.toJSON(result.value));
      } else {
        return res
          .status(result.error.statusCode)
          .json({ error: result.error.message });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({ errors: error.issues });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.getDeliveryUseCase.execute(id);

    if (result.isSuccess()) {
      return res.status(200).json(DeliveryPresenter.toJSON(result.value));
    } else {
      return res
        .status(result.error.statusCode)
        .json({ error: result.error.message });
    }
  }

  async list(req: Request, res: Response) {
    const result = await this.listDeliveriesUseCase.execute();

    if (result.isSuccess()) {
      const deliveriesJSON = result.value.map(DeliveryPresenter.toJSON);
      return res.status(200).json(deliveriesJSON);
    } else {
      return res
        .status(result.error.statusCode)
        .json({ error: result.error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deliveryDTO = updateDeliverySchema.parse(req.body);
      const result = await this.updateDeliveryUseCase.execute(id, deliveryDTO);

      if (result.isSuccess()) {
        return res.status(200).json(DeliveryPresenter.toJSON(result.value));
      } else {
        return res
          .status(result.error.statusCode)
          .json({ error: result.error.message });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({ errors: error.issues });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.deleteDeliveryUseCase.execute(id);

    if (result.isSuccess()) {
      return res.status(204).send();
    } else {
      return res
        .status(result.error.statusCode)
        .json({ error: result.error.message });
    }
  }
}
