import { Request, Response, NextFunction } from 'express';
import { CreateShippingRateUseCase } from '../../application/use-cases/create-shipping-rate.usecase';
import { UpdateShippingRateUseCase } from '../../application/use-cases/update-shipping-rate.usecase';
import { DeleteShippingRateUseCase } from '../../application/use-cases/delete-shipping-rate.usecase';
import { GetShippingRateUseCase } from '../../application/use-cases/get-shipping-rate.usecase';
import { ListShippingRatesUseCase } from '../../application/use-cases/list-shipping-rates.usecase';
import { CalculateShippingRateUseCase } from '../../application/use-cases/calculate-shipping-rate.usecase';
import { ShippingRatePresenter } from './presenters/shipping-rate.presenter';

export class ShippingRateController {
  constructor(
    private readonly createShippingRateUseCase: CreateShippingRateUseCase,
    private readonly updateShippingRateUseCase: UpdateShippingRateUseCase,
    private readonly deleteShippingRateUseCase: DeleteShippingRateUseCase,
    private readonly getShippingRateUseCase: GetShippingRateUseCase,
    private readonly listShippingRatesUseCase: ListShippingRatesUseCase,
    private readonly calculateShippingRateUseCase: CalculateShippingRateUseCase,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.createShippingRateUseCase.execute(req.body);
      if (result.isSuccess()) {
        res.status(201).json(ShippingRatePresenter.toHTTP(result.value));
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  async calculate(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.calculateShippingRateUseCase.execute(req.body);
      if (result.isSuccess()) {
        res.status(200).json({ rate: result.value });
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.updateShippingRateUseCase.execute(
        req.params.id,
        req.body,
      );
      if (result.isSuccess()) {
        res.status(200).json(ShippingRatePresenter.toHTTP(result.value));
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.deleteShippingRateUseCase.execute(
        req.params.id,
      );
      if (result.isSuccess()) {
        res.status(204).send();
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.getShippingRateUseCase.execute(req.params.id);
      if (result.isSuccess()) {
        res.status(200).json(ShippingRatePresenter.toHTTP(result.value));
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.listShippingRatesUseCase.execute();
      if (result.isSuccess()) {
        res.status(200).json(result.value.map(ShippingRatePresenter.toHTTP));
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }
}
