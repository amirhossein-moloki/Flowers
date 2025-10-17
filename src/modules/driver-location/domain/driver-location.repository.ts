import { DriverLocation } from './driver-location.entity';

export interface IDriverLocationRepository {
  findById(id: string): Promise<DriverLocation | null>;
  findAll(): Promise<DriverLocation[]>;
  save(driverLocation: DriverLocation): Promise<void>;
  delete(id: string): Promise<void>;
}