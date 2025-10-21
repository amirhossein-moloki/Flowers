import request from 'supertest';
import express from 'express';
import { createServiceZoneRoutes } from '../routes';
import { Dependencies } from '../../../../infrastructure/di';
import { PrismaClient } from '@prisma/client';
import { PrismaServiceZoneRepository } from '../../infrastructure/prisma-service-zone.repository';
import { GetServiceZoneUseCase } from '../../application/use-cases/get-service-zone.usecase';
import { ListServiceZonesUseCase } from '../../application/use-cases/list-service-zones.usecase';

describe('ServiceZone Routes', () => {
  const app = express();
  let prisma: PrismaClient;
  let dependencies: Dependencies;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
    const serviceZoneRepository = new PrismaServiceZoneRepository(prisma);
    dependencies = {
      getServiceZoneUseCase: new GetServiceZoneUseCase(serviceZoneRepository),
      listServiceZonesUseCase: new ListServiceZonesUseCase(serviceZoneRepository),
    } as Dependencies;
    app.use('/service-zones', createServiceZoneRoutes(dependencies));
  });

  beforeEach(async () => {
    await prisma.serviceZone.deleteMany({});
  });

  afterAll(async () => {
    await prisma.serviceZone.deleteMany({});
    await prisma.$disconnect();
  });

  describe('GET /service-zones', () => {
    it('should return a list of service zones', async () => {
      // Arrange
      await prisma.serviceZone.createMany({
        data: [
          { name: 'Zone A', geo_json: '{}' },
          { name: 'Zone B', geo_json: '{}' },
        ],
      });

      // Act
      const response = await request(app).get('/service-zones');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe('Zone A');
    });
  });

  describe('GET /service-zones/:id', () => {
    it('should return a service zone by id', async () => {
      // Arrange
      const serviceZone = await prisma.serviceZone.create({
        data: { name: 'Zone A', geo_json: '{}' },
      });

      // Act
      const response = await request(app).get(`/service-zones/${serviceZone.id}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Zone A');
    });

    it('should return 404 if service zone not found', async () => {
      // Act
      const response = await request(app).get('/service-zones/non-existent-id');

      // Assert
      expect(response.status).toBe(404);
    });
  });
});
