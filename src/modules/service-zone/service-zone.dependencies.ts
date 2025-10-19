import { GetServiceZoneUseCase } from './application/use-cases/get-service-zone.usecase';
import { ListServiceZonesUseCase } from './application/use-cases/list-service-zones.usecase';

export type ServiceZoneDependencies = {
  getServiceZoneUseCase: GetServiceZoneUseCase;
  listServiceZonesUseCase: ListServiceZonesUseCase;
};
