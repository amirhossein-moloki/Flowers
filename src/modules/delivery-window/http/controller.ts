import { Request, Response } from 'express';
import { CreateDeliveryWindowUseCase } from '../application/use-cases/create-delivery-window.usecase';
import { GetAllDeliveryWindowsUseCase } from '../application/use-cases/get-all-delivery-windows.usecase';
import { GetDeliveryWindowByIdUseCase } from '../application/use-cases/get-delivery-window-by-id.usecase';
import { UpdateDeliveryWindowUseCase } from '../application/use-cases/update-delivery-window.usecase';
import { DeleteDeliveryWindowUseCase } from '../application/use-cases/delete-delivery-window.usecase';
import { CreateDeliveryWindowDTO } from './dto/create-delivery-window.schema';
import { UpdateDeliveryWindowDTO } from './dto/update-delivery-window.schema';
import { DeliveryWindowPresenter } from './presenters/delivery-window.presenter';

export class DeliveryWindowController {
  constructor(
    private readonly createDeliveryWindowUseCase: CreateDeliveryWindowUseCase,
    private readonly getAllDeliveryWindowsUseCase: GetAllDeliveryWindowsUseCase,
    private readonly getDeliveryWindowByIdUseCase: GetDeliveryWindowByIdUseCase,
    private readonly updateDeliveryWindowUseCase: UpdateDeliveryWindowUseCase,
    private readonly deleteDeliveryWindowUseCase: DeleteDeliveryWindowUseCase,
  ) {}

  create = async (req: Request, res: Response): Promise<Response> => {
    const dto: CreateDeliveryWindowDTO = req.body;
    const result = await this.createDeliveryWindowUseCase.execute(dto);

    if (result.isFailure()) {
      return res.status(400).json({ error: result.error.message });
    }

    return res.status(201).json(DeliveryWindowPresenter.toJSON(result.value));
  };

  getAll = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.getAllDeliveryWindowsUseCase.execute();

    if (result.isFailure()) {
      return res.status(400).json({ error: result.error.message });
    }

    return res
      .status(200)
      .json(DeliveryWindowPresenter.toJSONList(result.value));
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const result = await this.getDeliveryWindowByIdUseCase.execute(id);

    if (result.isFailure()) {
      return res.status(404).json({ error: 'Delivery window not found' });
    }

    return res.status(200).json(DeliveryWindowPresenter.toJSON(result.value));
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const dto: UpdateDeliveryWindowDTO = req.body;
    const result = await this.updateDeliveryWindowUseCase.execute(id, dto);

    if (result.isFailure()) {
      return res.status(404).json({ error: 'Delivery window not found' });
    }

    return res.status(200).json(DeliveryWindowPresenter.toJSON(result.value));
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const result = await this.deleteDeliveryWindowUseCase.execute(id);

    if (result.isFailure()) {
      return res.status(404).json({ error: 'Delivery window not found' });
    }

    return res.status(204).send();
  };
}
