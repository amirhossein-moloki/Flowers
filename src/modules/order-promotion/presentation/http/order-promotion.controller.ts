import { Request, Response } from 'express';
import { CreateOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/create-order-promotion.usecase';
import { GetOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/get-order-promotion.usecase';
import { UpdateOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/update-order-promotion.usecase';
import { DeleteOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/delete-order-promotion.usecase';
import { OrderPromotionPresenter } from '../order-promotion.presenter';

export class OrderPromotionController {
  constructor(
    private createOrderPromotionUseCase: CreateOrderPromotionUseCase,
    private getOrderPromotionUseCase: GetOrderPromotionUseCase,
    private updateOrderPromotionUseCase: UpdateOrderPromotionUseCase,
    private deleteOrderPromotionUseCase: DeleteOrderPromotionUseCase,
  ) {}

  private handleError(res: Response, error: any) {
    if (error.name === 'NotFoundError') {
      return res.status(404).json({ error: error.message });
    }
    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }

  async create(req: Request, res: Response) {
    try {
      const result = await this.createOrderPromotionUseCase.execute(req.body);

      if (result.success) {
        res.status(201).json(OrderPromotionPresenter.toDTO(result.value));
      } else {
        this.handleError(res, result.error);
      }
    } catch (error) {
      console.error('Error in OrderPromotionController.create:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.getOrderPromotionUseCase.execute({ id });

      if (result.success) {
        res.status(200).json(OrderPromotionPresenter.toDTO(result.value));
      } else {
        this.handleError(res, result.error);
      }
    } catch (error) {
      console.error('Error in OrderPromotionController.findById:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.updateOrderPromotionUseCase.execute({
        id,
        ...req.body,
      });

      if (result.success) {
        res.status(200).json(OrderPromotionPresenter.toDTO(result.value));
      } else {
        this.handleError(res, result.error);
      }
    } catch (error) {
      console.error('Error in OrderPromotionController.update:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.deleteOrderPromotionUseCase.execute({ id });

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
