import { PrismaServiceZoneRepository } from '../../service-zone/infrastructure/prisma-service-zone.repository';
import { ServiceZone } from '../../service-zone/domain/service-zone.entity';
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset } from 'jest-mock-extended';
import { ServiceZoneMapper } from '../../service-zone/infrastructure/service-zone.mapper';

const prismaMock = mockDeep<PrismaClient>();

jest.mock('../../service-zone/infrastructure/service-zone.mapper', () => ({
  ServiceZoneMapper: {
    toDomain: jest.fn(),
    toPersistence: jest.fn(),
  },
}));

describe('PrismaServiceZoneRepository', () => {
  let repository: PrismaServiceZoneRepository;
  let mockMapper;

  beforeEach(() => {
    mockReset(prismaMock);
    repository = new PrismaServiceZoneRepository(prismaMock);
    mockMapper = ServiceZoneMapper;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return a service zone if found', async () => {
      const serviceZoneId = 'some-id';
      const prismaServiceZone = { id: serviceZoneId, name: 'SZ 1', geo_json: '{}', is_active: true, created_at: new Date(), updated_at: new Date() };
      const domainServiceZone = ServiceZone.create({ name: 'SZ 1', geojson: {}, is_active: true }, serviceZoneId).value;

      prismaMock.serviceZone.findUnique.mockResolvedValue(prismaServiceZone);
      mockMapper.toDomain.mockReturnValue(domainServiceZone);

      const result = await repository.findById(serviceZoneId);

      expect(result).toEqual(domainServiceZone);
      expect(prismaMock.serviceZone.findUnique).toHaveBeenCalledWith({ where: { id: serviceZoneId } });
      expect(mockMapper.toDomain).toHaveBeenCalledWith(prismaServiceZone);
    });

    it('should return null if service zone not found', async () => {
      const serviceZoneId = 'non-existent-id';
      prismaMock.serviceZone.findUnique.mockResolvedValue(null);

      const result = await repository.findById(serviceZoneId);

      expect(result).toBeNull();
      expect(prismaMock.serviceZone.findUnique).toHaveBeenCalledWith({ where: { id: serviceZoneId } });
    });
  });

  describe('findAll', () => {
    it('should return all service zones', async () => {
      const prismaServiceZones = [
        { id: '1', name: 'SZ 1', geo_json: '{}', is_active: true, created_at: new Date(), updated_at: new Date() },
        { id: '2', name: 'SZ 2', geo_json: '{}', is_active: true, created_at: new Date(), updated_at: new Date() },
      ];
      const domainServiceZones = prismaServiceZones.map(sz => ServiceZone.create({ name: sz.name, geojson: {}, is_active: sz.is_active }, sz.id).value);

      prismaMock.serviceZone.findMany.mockResolvedValue(prismaServiceZones);
      mockMapper.toDomain.mockImplementation(sz => domainServiceZones.find(dsz => dsz.id === sz.id));

      const result = await repository.findAll();

      expect(result).toEqual(domainServiceZones);
      expect(prismaMock.serviceZone.findMany).toHaveBeenCalled();
      expect(mockMapper.toDomain).toHaveBeenCalledTimes(2);
    });
  });

  describe('save', () => {
    it('should upsert a service zone', async () => {
      const serviceZone = ServiceZone.create({ name: 'SZ 1', geojson: {}, is_active: true }, 'some-id').value;
      const persistenceServiceZone = { id: 'some-id', name: 'SZ 1', geo_json: '{}', is_active: true, created_at: new Date(), updated_at: new Date() };

      mockMapper.toPersistence.mockReturnValue(persistenceServiceZone);

      await repository.save(serviceZone);

      expect(mockMapper.toPersistence).toHaveBeenCalledWith(serviceZone);
      expect(prismaMock.serviceZone.upsert).toHaveBeenCalledWith({
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
      expect(prismaMock.serviceZone.delete).toHaveBeenCalledWith({ where: { id: serviceZoneId } });
    });
  });
});
