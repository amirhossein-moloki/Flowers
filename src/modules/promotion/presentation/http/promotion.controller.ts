import { Request, Response } from 'express';
import { CreatePromotionUseCase } from '@/modules/promotion/application/use-cases/create-promotion.usecase';
import { GetPromotionUseCase } from '@/modules/promotion/application/use-cases/get-promotion.usecase';
import { PromotionPresenter } from './presenters/promotion.presenter';
import { UpdatePromotionUseCase } from '@/modules/promotion/application/use-cases/update-promotion.usecase';
import { DeletePromotionUseCase } from '@/modules/promotion/application/use-cases/delete-promotion.usecase';
import { GetAllPromotionsUseCase } from '@/modules/promotion/application/use-cases/get-all-promotions.usecase';
import { NotFoundError } from '@/core/errors/not-found.error';

export class PromotionController {
  constructor(
    private createPromotionUseCase: CreatePromotionUseCase,
    private getPromotionUseCase: GetPromotionUseCase,
    private updatePromotionUseCase: UpdatePromotionUseCase,
    private deletePromotionUseCase: DeletePromotionUseCase,
    private getAllPromotionsUseCase: GetAllPromotionsUseCase,
  ) {}

  private handleError(res: Response, error: Error) {
    if (error.name === 'NotFoundError') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'Start date cannot be after end date') {
      return res.status(422).json({ error: error.message });
    }
    return res.status(400).json({ error: error.message });
  }

  async create(req: Request, res: Response) {
    const result = await this.createPromotionUseCase.execute(req.body);

    if (result.success) {
      res.status(201).json(PromotionPresenter.toJSON(result.value));
    } else {
      this.handleError(res, result.error);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.getPromotionUseCase.execute({ id });

      if (result.success) {
        res.status(200).json(PromotionPresenter.toJSON(result.value));
      } else {
        this.handleError(res, result.error);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await this.getAllPromotionsUseCase.execute();

      if (result.success) {
        res.status(200).json(result.value.map(PromotionPresenter.toJSON));
      } else {
        this.handleError(res, result.error);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.updatePromotionUseCase.execute({
        id,
        ...req.body,
      });

      if (result.success) {
        res.status(200).json(PromotionPresenter.toJSON(result.value));
      } else {
        this.handleError(res, result.error);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.deletePromotionUseCase.execute({ id });

      if (result.success) {
        res.status(204).send();
      } else {
        this.handleError(res, result.error);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
