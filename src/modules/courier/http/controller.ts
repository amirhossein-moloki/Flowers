import { Request, Response } from 'express';
import { z } from 'zod';
import { createCourierSchema } from './dto/create-courier.schema';
import { updateCourierSchema } from './dto/update-courier.schema';
import { CourierPresenter } from './presenters/courier.presenter';
import { CreateCourierUseCase } from '../application/use-cases/create-courier.usecase';
import { GetCourierUseCase } from '../application/use-cases/get-courier.usecase';
import { UpdateCourierUseCase } from '../application/use-cases/update-courier.usecase';
import { DeleteCourierUseCase } from '../application/use-cases/delete-courier.usecase';
import { ListCouriersUseCase } from '../application/use-cases/list-couriers.usecase';

export class CourierController {
  constructor(
    private readonly createCourierUseCase: CreateCourierUseCase,
    private readonly getCourierUseCase: GetCourierUseCase,
    private readonly updateCourierUseCase: UpdateCourierUseCase,
    private readonly deleteCourierUseCase: DeleteCourierUseCase,
    private readonly listCouriersUseCase: ListCouriersUseCase,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const courierDTO = createCourierSchema.parse(req.body);
      const result = await this.createCourierUseCase.execute(courierDTO);

      if (result.success) {
        return res.status(201).json(CourierPresenter.toJSON(result.value));
      } else {
        return res.status(400).json({ error: result.error.message });
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
    const result = await this.getCourierUseCase.execute(id);

    if (result.success) {
      if (result.value) {
        return res.status(200).json(CourierPresenter.toJSON(result.value));
      } else {
        return res.status(404).json({ error: 'Courier not found' });
      }
    } else {
      return res.status(404).json({ error: result.error.message });
    }
  }

  async list(req: Request, res: Response) {
    const result = await this.listCouriersUseCase.execute();

    if (result.success) {
        const couriersJSON = result.value.map(CourierPresenter.toJSON);
        return res.status(200).json(couriersJSON);
    } else {
        return res.status(500).json({ error: result.error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const courierDTO = updateCourierSchema.parse(req.body);
      const result = await this.updateCourierUseCase.execute(id, courierDTO);

      if (result.success) {
        return res.status(200).json(CourierPresenter.toJSON(result.value));
      } else {
        return res.status(400).json({ error: result.error.message });
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
    const result = await this.deleteCourierUseCase.execute(id);

    if (result.success) {
      return res.status(204).send();
    } else {
      return res.status(400).json({ error: result.error.message });
    }
  }
}