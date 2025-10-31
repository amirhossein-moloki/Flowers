import { Request, Response } from 'express';
import { VendorOutletPresenter } from './presenters/vendor-outlet.presenter';
import { CreateVendorOutletInput } from './dto/create-vendor-outlet.schema';
import { VendorOutletDependencies } from '../vendor-outlet.dependencies';
import { UpdateVendorOutletInput } from './dto/update-vendor-outlet.schema';

export class VendorOutletController {
  private readonly createVendorOutletUseCase: VendorOutletDependencies['createVendorOutletUseCase'];
  private readonly getVendorOutletUseCase: VendorOutletDependencies['getVendorOutletUseCase'];
  private readonly updateVendorOutletUseCase: VendorOutletDependencies['updateVendorOutletUseCase'];
  private readonly deleteVendorOutletUseCase: VendorOutletDependencies['deleteVendorOutletUseCase'];
  private readonly listVendorOutletsUseCase: VendorOutletDependencies['listVendorOutletsUseCase'];

  constructor(dependencies: VendorOutletDependencies) {
    this.createVendorOutletUseCase = dependencies.createVendorOutletUseCase;
    this.getVendorOutletUseCase = dependencies.getVendorOutletUseCase;
    this.updateVendorOutletUseCase = dependencies.updateVendorOutletUseCase;
    this.deleteVendorOutletUseCase = dependencies.deleteVendorOutletUseCase;
    this.listVendorOutletsUseCase = dependencies.listVendorOutletsUseCase;
  }

  async create(req: Request, res: Response): Promise<Response> {
    const result = await this.createVendorOutletUseCase.execute(req.body);

    if (!result.isSuccess()) {
      return res.status(400).json({ error: result.error?.message });
    }

    return res.status(201).json(VendorOutletPresenter.toJSON(result.value));
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await this.getVendorOutletUseCase.execute(id);

    if (!result.isSuccess()) {
      return res.status(404).json({ error: 'Vendor outlet not found' });
    }

    return res.status(200).json(VendorOutletPresenter.toJSON(result.value));
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await this.updateVendorOutletUseCase.execute(id, req.body);

    if (!result.isSuccess()) {
      return res.status(404).json({ error: 'Vendor outlet not found' });
    }

    return res.status(200).json(VendorOutletPresenter.toJSON(result.value));
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await this.deleteVendorOutletUseCase.execute(id);

    if (!result.isSuccess()) {
      return res.status(404).json({ error: 'Vendor outlet not found' });
    }

    return res.status(204).send();
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const result = await this.listVendorOutletsUseCase.execute();

    if (!result.isSuccess()) {
      return res.status(400).json({ error: result.error?.message });
    }

    return res.status(200).json(result.value.map(VendorOutletPresenter.toJSON));
  }
}
