import { Request, Response, NextFunction } from 'express';
import { CreateDriverLocationUseCase } from '../application/use-cases/create-driver-location.usecase';
import { GetDriverLocationUseCase } from '../application/use-cases/get-driver-location.usecase';
import { UpdateDriverLocationUseCase } from '../application/use-cases/update-driver-location.usecase';
import { DeleteDriverLocationUseCase } from '../application/use-cases/delete-driver-location.usecase';
import { Dependencies } from '@/infrastructure/di';
import { StatusCodes } from 'http-status-codes';

export class DriverLocationController {
  private readonly createDriverLocationUseCase: CreateDriverLocationUseCase;
  private readonly getDriverLocationUseCase: GetDriverLocationUseCase;
  private readonly updateDriverLocationUseCase: UpdateDriverLocationUseCase;
  private readonly deleteDriverLocationUseCase: DeleteDriverLocationUseCase;

  constructor(private readonly dependencies: Dependencies) {
    this.createDriverLocationUseCase = dependencies.createDriverLocationUseCase;
    this.getDriverLocationUseCase = dependencies.getDriverLocationUseCase;
    this.updateDriverLocationUseCase = dependencies.updateDriverLocationUseCase;
    this.deleteDriverLocationUseCase = dependencies.deleteDriverLocationUseCase;
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.createDriverLocationUseCase.execute(req.body);
      if (result.success) {
        res.status(StatusCodes.CREATED).json(result.value);
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.getDriverLocationUseCase.execute(id);
      if (result.success) {
        if (result.value) {
          res.status(StatusCodes.OK).json(result.value);
        } else {
          res.status(StatusCodes.NOT_FOUND).send();
        }
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.updateDriverLocationUseCase.execute(id, req.body);
      if (result.success) {
        res.status(StatusCodes.OK).json(result.value);
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.deleteDriverLocationUseCase.execute(id);
      if (result.success) {
        res.status(StatusCodes.NO_CONTENT).send();
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  };
}
