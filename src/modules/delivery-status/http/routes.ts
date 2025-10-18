import { Router } from 'express';
import { DeliveryStatusController } from './controller';

const deliveryStatusRouter = Router();
const deliveryStatusController = new DeliveryStatusController();

deliveryStatusRouter.get('/', (req, res) => deliveryStatusController.list(req, res));
deliveryStatusRouter.get('/:id', (req, res) => deliveryStatusController.findById(req, res));

export { deliveryStatusRouter };