import { Router } from 'express';
import { DeliveryController } from './controller';

const deliveryRouter = Router();
const deliveryController = new DeliveryController();

deliveryRouter.post('/', (req, res) => deliveryController.create(req, res));
deliveryRouter.get('/', (req, res) => deliveryController.list(req, res));
deliveryRouter.get('/:id', (req, res) => deliveryController.findById(req, res));
deliveryRouter.put('/:id', (req, res) => deliveryController.update(req, res));
deliveryRouter.delete('/:id', (req, res) => deliveryController.delete(req, res));

// Placeholder for assign-driver endpoint
deliveryRouter.post('/:id/assign-driver', (req, res) => {
    res.status(200).json({ message: `Driver assigned to delivery ${req.params.id}` });
});


export { deliveryRouter };