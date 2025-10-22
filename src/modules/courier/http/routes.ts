import { Router } from 'express';
import { CourierController } from './controller';
import { CreateCourierUseCase } from '../application/use-cases/create-courier.usecase';
import { GetCourierUseCase } from '../application/use-cases/get-courier.usecase';
import { UpdateCourierUseCase } from '../application/use-cases/update-courier.usecase';
import { DeleteCourierUseCase } from '../application/use-cases/delete-courier.usecase';
import { ListCouriersUseCase } from '../application/use-cases/list-couriers.usecase';
import { isAuthenticated, hasRole } from '@/core/middlewares/auth.middleware';
import { UserRole } from '@prisma/client';

export function createCourierRoutes(
  createCourierUseCase: CreateCourierUseCase,
  getCourierUseCase: GetCourierUseCase,
  updateCourierUseCase: UpdateCourierUseCase,
  deleteCourierUseCase: DeleteCourierUseCase,
  listCouriersUseCase: ListCouriersUseCase,
): Router {
  const router = Router();
  const courierController = new CourierController(
    createCourierUseCase,
    getCourierUseCase,
    updateCourierUseCase,
    deleteCourierUseCase,
    listCouriersUseCase,
  );

  router.use(isAuthenticated);

  router.post('/', hasRole([UserRole.ADMIN]), (req, res) => courierController.create(req, res));
  router.get('/:id', (req, res) => courierController.findById(req, res));
  router.put('/:id', hasRole([UserRole.ADMIN]), (req, res) => courierController.update(req, res));
  router.delete('/:id', hasRole([UserRole.ADMIN]), (req, res) => courierController.delete(req, res));
  router.get('/', (req, res) => courierController.list(req, res));

  return router;
}