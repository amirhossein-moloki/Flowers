import { ServiceZone } from '../../domain/service-zone.entity';

export class ServiceZonePresenter {
  static toJSON(serviceZone: ServiceZone) {
    return {
      id: serviceZone.id,
      name: serviceZone.name,
      geo_json: serviceZone.geo_json,
      is_active: serviceZone.is_active,
    };
  }
}
