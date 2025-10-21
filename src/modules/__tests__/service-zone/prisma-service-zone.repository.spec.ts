import { PrismaServiceZoneRepository } from '../../service-zone/infrastructure/prisma-service-zone.repository';
import { ServiceZone } from '../../service-zone/domain/service-zone.entity';
import prisma from '../../../infrastructure/database/prisma/prisma-client';
import { ServiceZoneMapper } from '../../service-zone/infrastructure/service-zone.mapper';

import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaServiceZoneRepository } from '../../service-zone/infrastructure/prisma-service-zone.repository';
import { ServiceZone } from '../../service-zone/domain/service-zone.entity';
import { ServiceZoneMapper } from '../../service-zone/infrastructure/service-zone.mapper';

describe('PrismaServiceZoneRepository', () => {
  let repository: PrismaServiceZoneRepository;
  let mockPrisma: DeepMockProxy<PrismaClient>;

  beforeEach(() => {
    mockPrisma = mockDeep<PrismaClient>();
    repository = new PrismaServiceZoneRepository(mockPrisma);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return a service zone if found', async () => {
      const serviceZoneId = 'some-id';
      const prismaServiceZone = { id: serviceZoneId, name: 'SZ 1', geo_json: 'points', is_active: true, created_at: new Date(), updated_at: new Date() };
      // @ts-ignore
      mockPrisma.serviceZone.findUnique.mockResolvedValue(prismaServiceZone);

      const result = await repository.findById(serviceZoneId);

      expect(result.id).toEqual(serviceZoneId);
      expect(mockPrisma.serviceZone.findUnique).toHaveBeenCalledWith({ where: { id: serviceZoneId } });
    });

    it('should return null if service zone not found', async () => {
      const serviceZoneId = 'non-existent-id';
      // @ts-ignore
      mockPrisma.serviceZone.findUnique.mockResolvedValue(null);

      const result = await repository.findById(serviceZoneId);

      expect(result).toBeNull();
      expect(mockPrisma.serviceZone.findUnique).toHaveBeenCalledWith({ where: { id: serviceZoneId } });
    });
  });

  describe('findAll', () => {
    it('should return all service zones', async () => {
      const prismaServiceZones = [
        { id: '1', name: 'SZ 1', geo_json: 'points 1', is_active: true, created_at: new Date(), updated_at: new Date() },
        { id: '2', name: 'SZ 2', geo_json: 'points 2', is_active: true, created_at: new Date(), updated_at: new Date() },
      ];
      // @ts-ignore
      mockPrisma.serviceZone.findMany.mockResolvedValue(prismaServiceZones);

      const result = await repository.findAll();

      expect(result).toHaveLength(2);
      expect(mockPrisma.serviceZone.findMany).toHaveBeenCalled();
    });
  });

  describe('save', () => {
    it('should upsert a service zone', async () => {
      const serviceZone = ServiceZone.create({ name: 'SZ 1', points: 'points', is_active: true }, 'some-id').value;

      await repository.save(serviceZone);

      expect(mockPrisma.serviceZone.upsert).toHaveBeenCalledWith({
        where: { id: serviceZone.id },
        update: {
          id: serviceZone.id,
          name: serviceZone.name,
          geo_json: serviceZone.points,
          is_active: serviceZone.is_active,
        },
        create: {
          id: serviceZone.id,
          name: serviceZone.name,
          geo_json: serviceZone.points,
          is_active: serviceZone.is_active,
        },
      });
    });
  });

  describe('delete', () => {
    it('should delete a service zone', async () => {
      const serviceZoneId = 'some-id';
      await repository.delete(serviceZoneId);
      expect(mockPrisma.serviceZone.delete).toHaveBeenCalledWith({ where: { id: serviceZoneId } });
    });
  });
});