import { Request, Response, NextFunction } from 'express';
import { ProofOfDeliveryPresenter } from './presenters/proof-of-delivery.presenter';
import { CreateProofOfDeliveryUseCase } from '../../application/use-cases/create-proof-of-delivery.usecase';
import { FindProofOfDeliveryByIdUseCase } from '../../application/use-cases/find-proof-of-delivery-by-id.usecase';
import { UpdateProofOfDeliveryUseCase } from '../../application/use-cases/update-proof-of-delivery.usecase';
import { DeleteProofOfDeliveryUseCase } from '../../application/use-cases/delete-proof-of-delivery.usecase';

export class ProofOfDeliveryController {
  constructor(
    private readonly createProofOfDeliveryUseCase: CreateProofOfDeliveryUseCase,
    private readonly findProofOfDeliveryByIdUseCase: FindProofOfDeliveryByIdUseCase,
    private readonly updateProofOfDeliveryUseCase: UpdateProofOfDeliveryUseCase,
    private readonly deleteProofOfDeliveryUseCase: DeleteProofOfDeliveryUseCase,
  ) {}

  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const result = await this.createProofOfDeliveryUseCase.execute(req.body);
    if (result.isSuccess()) {
      return res
        .status(201)
        .json(ProofOfDeliveryPresenter.toJSON(result.value));
    }
    next(result.error);
  }

  async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const result = await this.findProofOfDeliveryByIdUseCase.execute(
      req.params.id,
    );
    if (result.isSuccess()) {
      return res
        .status(200)
        .json(ProofOfDeliveryPresenter.toJSON(result.value));
    }
    next(result.error);
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const result = await this.updateProofOfDeliveryUseCase.execute({
      id: req.params.id,
      ...req.body,
    });
    if (result.isSuccess()) {
      return res
        .status(200)
        .json(ProofOfDeliveryPresenter.toJSON(result.value));
    }
    next(result.error);
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const result = await this.deleteProofOfDeliveryUseCase.execute(
      req.params.id,
    );
    if (result.isSuccess()) {
      return res.status(204).send();
    }
    next(result.error);
  }
}
