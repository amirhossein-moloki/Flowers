import { IServiceZoneRepository } from '../../domain/service-zone.repository';
import { ServiceZone } from '../../domain/service-zone.entity';
import { Result, success } from '../../../../core/utils/result';

export class ListServiceZonesUseCase {
  constructor(private readonly serviceZoneRepository: IServiceZoneRepository) {}

  async execute(): Promise<Result<ServiceZone[], Error>> {
    const serviceZones = await this.serviceZoneRepository.findAll();
    return success(serviceZones);
  }
}
