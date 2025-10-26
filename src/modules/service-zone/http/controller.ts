import { Request, Response } from 'express';
import { GetServiceZoneUseCase, ListServiceZonesUseCase } from '../../application/use-cases';
import { ServiceZonePresenter } from './presenters/service-zone.presenter';

export class ServiceZoneController {
  constructor(
    private readonly getServiceZoneUseCase: GetServiceZoneUseCase,
    private readonly listServiceZonesUseCase: ListServiceZonesUseCase,
  ) {}

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await this.getServiceZoneUseCase.execute(id);

    if (!result.success) {
      return res.status(404).json({ error: 'Service zone not found' });
    }

    return res.status(200).json(ServiceZonePresenter.toJSON(result.value));
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const result = await this.listServiceZonesUseCase.execute();

    if (!result.success) {
      // It's better to handle the error case explicitly
      return res.status(500).json({ error: 'Failed to retrieve service zones' });
    }

    return res.status(200).json(result.value.map(ServiceZonePresenter.toJSON));
  }
}
