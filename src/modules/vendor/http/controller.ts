import { Request, Response } from 'express';
import { VendorPresenter } from './presenters/vendor.presenter';
import { CreateVendorInput } from './dto/create-vendor.schema';
import { CreateVendorUseCase } from '../application/use-cases/create-vendor.usecase';
import { GetVendorUseCase } from '../application/use-cases/get-vendor.usecase';
import { UpdateVendorUseCase } from '../application/use-cases/update-vendor.usecase';
import { DeleteVendorUseCase } from '../application/use-cases/delete-vendor.usecase';
import { ListVendorsUseCase } from '../application/use-cases/list-vendors.usecase';

export class VendorController {
  constructor(
    private readonly createVendorUseCase: CreateVendorUseCase,
    private readonly getVendorUseCase: GetVendorUseCase,
    private readonly updateVendorUseCase: UpdateVendorUseCase,
    private readonly deleteVendorUseCase: DeleteVendorUseCase,
    private readonly listVendorsUseCase: ListVendorsUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const result = await this.createVendorUseCase.execute(req.body as CreateVendorInput);

    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }

    return res.status(201).json(VendorPresenter.toJSON(result.value));
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await this.getVendorUseCase.execute(id);

    if (!result.success) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    return res.status(200).json(VendorPresenter.toJSON(result.value));
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await this.updateVendorUseCase.execute(id, req.body);

    if (!result.success) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    return res.status(200).json(VendorPresenter.toJSON(result.value));
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await this.deleteVendorUseCase.execute(id);

    if (!result.success) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    return res.status(204).send();
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const result = await this.listVendorsUseCase.execute();

    return res.status(200).json(result.value.map(VendorPresenter.toJSON));
  }
}
