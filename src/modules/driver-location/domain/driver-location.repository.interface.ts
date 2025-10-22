import { DriverLocation } from '../domain/driver-location.entity';

export interface IDriverLocationRepository {
  save(driverLocation: DriverLocation): Promise<void>;
  findById(id: string): Promise<DriverLocation | null>;
  delete(id: string): Promise<void>;
}
