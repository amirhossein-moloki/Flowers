import { Request, Response, NextFunction, Router } from 'express';
import { Controller } from '@/core/http/http';
import { CreateOrderUseCase } from '@/modules/order/application/use-cases/create-order.usecase';
import { validate } from '@/core/middlewares/validate.middleware';
import { CreateOrderSchema } from '@/modules/order/presentation/http/dto/create-order.schema';
import { GetOrderUseCase } from '@/modules/order/application/use-cases/get-order.usecase';
import { FindAllOrdersUseCase } from '@/modules/order/application/use-cases/find-all-orders.usecase';
import { UpdateOrderUseCase } from '@/modules/order/application/use-cases/update-order.usecase';
import { DeleteOrderUseCase } from '@/modules/order/application/use-cases/delete-order.usecase';
import { ConfirmOrderUseCase } from '@/modules/order/application/use-cases/confirm-order.usecase';
import { CancelOrderUseCase } from '@/modules/order/application/use-cases/cancel-order.usecase';
import { UpdateOrderSchema } from '@/modules/order/presentation/http/dto/update-order.schema';
import { OrderPresenter } from './presenters/order.presenter';

export class OrderController extends Controller {
  public readonly router: Router;

  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly findAllOrdersUseCase: FindAllOrdersUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
    private readonly confirmOrderUseCase: ConfirmOrderUseCase,
    private readonly cancelOrderUseCase: CancelOrderUseCase,
  ) {
    super();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', validate(CreateOrderSchema), this.create.bind(this));
    this.router.get('/:id', this.findById.bind(this));
    this.router.get('/', this.findAll.bind(this));
    this.router.put(
      '/:id',
      validate(UpdateOrderSchema),
      this.update.bind(this),
    );
    this.router.delete('/:id', this.delete.bind(this));
    this.router.post('/:id/confirm', this.confirm.bind(this));
    this.router.post('/:id/cancel', this.cancel.bind(this));
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.createOrderUseCase.execute(req.body);
      if (result.isSuccess()) {
        res.status(201).json(OrderPresenter.toJSON(result.value));
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  private async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.getOrderUseCase.execute(req.params.id);
      if (result.isSuccess()) {
        res.status(200).json(OrderPresenter.toJSON(result.value));
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  private async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, page, pageSize } = req.query;
      const result = await this.findAllOrdersUseCase.execute(
        userId as string,
        parseInt(page as string, 10) || 1,
        parseInt(pageSize as string, 10) || 10,
      );
      if (result.isSuccess()) {
        res.status(200).json(result.value.map(OrderPresenter.toJSON));
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  private async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.updateOrderUseCase.execute(
        req.params.id,
        req.body,
      );
      if (result.isSuccess()) {
        res.status(200).json(OrderPresenter.toJSON(result.value));
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.deleteOrderUseCase.execute(req.params.id);
      if (result.isSuccess()) {
        res.status(204).send();
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  private async confirm(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.confirmOrderUseCase.execute(req.params.id);
      if (result.isSuccess()) {
        res.status(200).json(OrderPresenter.toJSON(result.value));
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  private async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.cancelOrderUseCase.execute(req.params.id);
      if (result.isSuccess()) {
        res.status(200).json(OrderPresenter.toJSON(result.value));
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }
}
