import { ServiceZone } from './service-zone.entity';

export interface IServiceZoneRepository {
  findById(id: string): Promise<ServiceZone | null>;
  findAll(): Promise<ServiceZone[]>;
  save(serviceZone: ServiceZone): Promise<void>;
  delete(id: string): Promise<void>;
}