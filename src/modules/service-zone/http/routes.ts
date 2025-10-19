import { Router } from 'express';
import { ServiceZoneController } from './controller';
import { GetServiceZoneUseCase } from '../application/use-cases/get-service-zone.usecase';
import { ListServiceZonesUseCase } from '../application/use-cases/list-service-zones.usecase';
import { PrismaServiceZoneRepository } from '../infrastructure/prisma-service-zone.repository';
import { AppDependencies } from '@/app';

export const createServiceZoneRoutes = (dependencies: AppDependencies) => {
  const router = Router();
  const serviceZoneRepository = new PrismaServiceZoneRepository(dependencies.prisma);
  const getServiceZoneUseCase = new GetServiceZoneUseCase(serviceZoneRepository);
  const listServiceZonesUseCase = new ListServiceZonesUseCase(serviceZoneRepository);

  const serviceZoneController = new ServiceZoneController({
    getServiceZoneUseCase,
    listServiceZonesUseCase,
  });

  router.get('/', serviceZoneController.findAll.bind(serviceZoneController));
  router.get('/:id', serviceZoneController.findById.bind(serviceZoneController));

  return router;
};
