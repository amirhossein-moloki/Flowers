import { Request, Response } from 'express';
import { GetAllOrderStatusesUseCase } from '../../application/use-cases/get-all-order-statuses.usecase';
import { GetOrderStatusUseCase } from '../../application/use-cases/get-order-status.usecase';
import { OrderStatusPresenter } from './presenters/order-status.presenter';

export class OrderStatusController {
  constructor(
    private readonly getAllOrderStatusesUseCase: GetAllOrderStatusesUseCase,
    private readonly getOrderStatusUseCase: GetOrderStatusUseCase,
  ) {}

  private handleError(res: Response, error: Error) {
    if (error.name === 'NotFoundError') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(400).json({ error: error.message });
  }

  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await this.getAllOrderStatusesUseCase.execute();
      if (!result.success) {
        return this.handleError(res, result.error);
      }
      const orderStatusesDTO = result.value.map(OrderStatusPresenter.toDTO);
      return res.status(200).json(orderStatusesDTO);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const result = await this.getOrderStatusUseCase.execute(id);
      if (!result.success) {
        return this.handleError(res, result.error);
      }
      if (!result.value) {
        return res.status(404).json({ error: 'Order status not found' });
      }
      const orderStatusDTO = OrderStatusPresenter.toDTO(result.value);
      return res.status(200).json(orderStatusDTO);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
