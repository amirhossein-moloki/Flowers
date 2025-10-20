import { Request, Response, NextFunction, Router } from 'express';
import { Controller } from '@/core/http/http';
import { CreatePaymentUseCase } from '@/modules/payment/application/use-cases/create-payment.usecase';
import { VerifyPaymentUseCase } from '@/modules/payment/application/use-cases/verify-payment.usecase';
import { validate } from '@/core/middlewares/validate.middleware';
import { CreatePaymentSchema } from '@/modules/payment/presentation/http/dto/create-payment.schema';
import { VerifyPaymentSchema } from '@/modules/payment/presentation/http/dto/verify-payment.schema';
import { PaymentPresenter } from './presenters/payment.presenter';

export class PaymentController extends Controller {
  public readonly router: Router;

  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    private readonly verifyPaymentUseCase: VerifyPaymentUseCase,
  ) {
    super();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', validate(CreatePaymentSchema), this.create.bind(this));
    this.router.post('/verify', validate(VerifyPaymentSchema), this.verify.bind(this));
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.createPaymentUseCase.execute(req.body);
      if (result.success) {
        res.status(201).json(PaymentPresenter.toJSON(result.value));
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  private async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.verifyPaymentUseCase.execute(req.body);
      if (result.success) {
        res.status(200).json(PaymentPresenter.toJSON(result.value));
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }
}
