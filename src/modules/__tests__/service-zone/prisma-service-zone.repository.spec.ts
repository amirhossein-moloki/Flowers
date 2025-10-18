import { PrismaServiceZoneRepository } from '../../service-zone/infrastructure/prisma-service-zone.repository';
import { ServiceZone } from '../../service-zone/domain/service-zone.entity';
import prisma from '../../../infrastructure/database/prisma/prisma-client';
import { ServiceZoneMapper } from '../../service-zone/infrastructure/service-zone.mapper';

jest.mock('../../../infrastructure/database/prisma/prisma-client', () => ({
  serviceZone: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock('../../service-zone/infrastructure/service-zone.mapper', () => ({
  ServiceZoneMapper: {
    toDomain: jest.fn(),
    toPersistence: jest.fn(),
  },
}));

describe('PrismaServiceZoneRepository', () => {
  let repository: PrismaServiceZoneRepository;
  let mockPrisma;
  let mockMapper;

  beforeEach(() => {
    repository = new PrismaServiceZoneRepository();
    mockPrisma = prisma.serviceZone;
    mockMapper = ServiceZoneMapper;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return a service zone if found', async () => {
      const serviceZoneId = 'some-id';
      const prismaServiceZone = { id: serviceZoneId, name: 'SZ 1', city: 'City 1', polygon_geojson: {}, is_active: true, created_at: new Date(), updated_at: new Date() };
      const domainServiceZone = ServiceZone.create({ name: 'SZ 1', city: 'City 1', polygon_geojson: {}, is_active: true }, serviceZoneId).value;

      mockPrisma.findUnique.mockResolvedValue(prismaServiceZone);
      mockMapper.toDomain.mockReturnValue(domainServiceZone);

      const result = await repository.findById(serviceZoneId);

      expect(result).toEqual(domainServiceZone);
      expect(mockPrisma.findUnique).toHaveBeenCalledWith({ where: { id: serviceZoneId } });
      expect(mockMapper.toDomain).toHaveBeenCalledWith(prismaServiceZone);
    });

    it('should return null if service zone not found', async () => {
      const serviceZoneId = 'non-existent-id';
      mockPrisma.findUnique.mockResolvedValue(null);

      const result = await repository.findById(serviceZoneId);

      expect(result).toBeNull();
      expect(mockPrisma.findUnique).toHaveBeenCalledWith({ where: { id: serviceZoneId } });
    });
  });

  describe('findAll', () => {
    it('should return all service zones', async () => {
      const prismaServiceZones = [
        { id: '1', name: 'SZ 1', city: 'City 1', polygon_geojson: {}, is_active: true, created_at: new Date(), updated_at: new Date() },
        { id: '2', name: 'SZ 2', city: 'City 2', polygon_geojson: {}, is_active: true, created_at: new Date(), updated_at: new Date() },
      ];
      const domainServiceZones = prismaServiceZones.map(sz => ServiceZone.create({ name: sz.name, city: sz.city, polygon_geojson: sz.polygon_geojson, is_active: sz.is_active }, sz.id).value);

      mockPrisma.findMany.mockResolvedValue(prismaServiceZones);
      mockMapper.toDomain.mockImplementation(sz => domainServiceZones.find(dsz => dsz.id === sz.id));

      const result = await repository.findAll();

      expect(result).toEqual(domainServiceZones);
      expect(mockPrisma.findMany).toHaveBeenCalled();
      expect(mockMapper.toDomain).toHaveBeenCalledTimes(2);
    });
  });

  describe('save', () => {
    it('should upsert a service zone', async () => {
      const serviceZone = ServiceZone.create({ name: 'SZ 1', city: 'City 1', polygon_geojson: {}, is_active: true }, 'some-id').value;
      const persistenceServiceZone = { id: 'some-id', name: 'SZ 1', city: 'City 1', polygon_geojson: {}, is_active: true, created_at: new Date(), updated_at: new Date() };

      mockMapper.toPersistence.mockReturnValue(persistenceServiceZone);

      await repository.save(serviceZone);

      expect(mockMapper.toPersistence).toHaveBeenCalledWith(serviceZone);
      expect(mockPrisma.upsert).toHaveBeenCalledWith({
        where: { id: serviceZone.id },
        update: persistenceServiceZone,
        create: persistenceServiceZone,
      });
    });
  });

  describe('delete', () => {
    it('should delete a service zone', async () => {
      const serviceZoneId = 'some-id';
      await repository.delete(serviceZoneId);
      expect(mockPrisma.delete).toHaveBeenCalledWith({ where: { id: serviceZoneId } });
    });
  });
});