import { Request, Response } from 'express';
import { Request, Response } from 'express';
import { VendorPresenter } from './presenters/vendor.presenter';
import { CreateVendorInput } from './dto/create-vendor.schema';
import { VendorDependencies } from '../vendor.dependencies';

export class VendorController {
  private readonly createVendorUseCase: VendorDependencies['createVendorUseCase'];
  private readonly getVendorUseCase: VendorDependencies['getVendorUseCase'];
  private readonly updateVendorUseCase: VendorDependencies['updateVendorUseCase'];
  private readonly deleteVendorUseCase: VendorDependencies['deleteVendorUseCase'];
  private readonly listVendorsUseCase: VendorDependencies['listVendorsUseCase'];

  constructor(dependencies: VendorDependencies) {
    this.createVendorUseCase = dependencies.createVendorUseCase;
    this.getVendorUseCase = dependencies.getVendorUseCase;
    this.updateVendorUseCase = dependencies.updateVendorUseCase;
    this.deleteVendorUseCase = dependencies.deleteVendorUseCase;
    this.listVendorsUseCase = dependencies.listVendorsUseCase;
  }

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
