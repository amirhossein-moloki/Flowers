import { Router } from 'express';
import { Dependencies } from '../../../../infrastructure/di';
import { NotificationController } from './notification.controller';
import { validate } from '../../../../core/middlewares/validate.middleware';
import { createNotificationSchema } from './dto/create-notification.schema';
import { updateNotificationSchema } from './dto/update-notification.schema';

export const createNotificationRoutes = (dependencies: Dependencies): Router => {
  const router = Router();
  const notificationController = new NotificationController(
    dependencies.createNotificationUseCase,
    dependencies.getNotificationUseCase,
    dependencies.updateNotificationUseCase,
    dependencies.deleteNotificationUseCase,
  );

  router.post(
    '/trigger',
    validate(createNotificationSchema),
    notificationController.create.bind(notificationController),
  );

  router.post(
    '/',
    validate(createNotificationSchema),
    notificationController.create.bind(notificationController),
  );

  router.get(
    '/:id',
    notificationController.find.bind(notificationController),
  );

  router.put(
    '/:id',
    validate(updateNotificationSchema),
    notificationController.update.bind(notificationController),
  );

  router.delete(
    '/:id',
    notificationController.delete.bind(notificationController),
  );

  return router;
};
