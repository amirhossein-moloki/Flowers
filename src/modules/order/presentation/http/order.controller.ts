import { Request, Response, NextFunction, Router } from 'express';
import { Controller } from '../../../../../core/http/http';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.usecase';
import { validate } from '../../../../../core/http/validators';
import { CreateOrderSchema } from '../../application/dtos/create-order.dto';

export class OrderController extends Controller {
  public readonly router: Router;

  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {
    super();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/',
      validate(CreateOrderSchema),
      this.createOrder.bind(this),
    );
  }

  private async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.createOrderUseCase.execute(req.body);
      if (result.success) {
        res.status(201).json(result.value);
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }
}