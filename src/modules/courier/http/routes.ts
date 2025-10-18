import { Router } from 'express';
import { CourierController } from './controller';

const courierRouter = Router();
const courierController = new CourierController();

courierRouter.post('/', (req, res) => courierController.create(req, res));
courierRouter.get('/', (req, res) => courierController.list(req, res));
courierRouter.get('/:id', (req, res) => courierController.findById(req, res));
courierRouter.put('/:id', (req, res) => courierController.update(req, res));
courierRouter.delete('/:id', (req, res) => courierController.delete(req, res));

export { courierRouter };