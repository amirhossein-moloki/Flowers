import { Request, Response } from 'express';
import { GetServiceZoneUseCase } from '../../application/use-cases/get-service-zone.usecase';
import { ListServiceZonesUseCase } from '../../application/use-cases/list-service-zones.usecase';
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

    return res.status(200).json(result.value.map(ServiceZonePresenter.toJSON));
  }
}
