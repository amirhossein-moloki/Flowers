import { Router } from 'express';
import { ServiceZoneController } from './controller';
import { Dependencies } from '@/infrastructure/di';

export const createServiceZoneRoutes = (dependencies: Dependencies) => {
  const router = Router();

  const serviceZoneController = new ServiceZoneController(
    dependencies.getServiceZoneUseCase,
    dependencies.listServiceZonesUseCase,
  );

  router.get('/', serviceZoneController.findAll.bind(serviceZoneController));
  router.get('/:id', serviceZoneController.findById.bind(serviceZoneController));

  return router;
};
