import { ServiceZoneRepository } from '../../domain/service-zone.repository';
import { ServiceZone } from '../../domain/service-zone.entity';
import { Result, success, failure } from '../../../../core/utils/result';

export class GetServiceZoneUseCase {
  constructor(private readonly serviceZoneRepository: ServiceZoneRepository) {}

  async execute(id: string): Promise<Result<ServiceZone, Error>> {
    const serviceZone = await this.serviceZoneRepository.findById(id);

    if (!serviceZone) {
      return failure(new Error('Service zone not found'));
    }

    return success(serviceZone);
  }
}
