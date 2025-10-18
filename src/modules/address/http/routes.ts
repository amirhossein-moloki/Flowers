import { Router } from 'express';
import { AddressController } from './controller';

const addressRouter = Router();
const controller = new AddressController();

addressRouter.post('/', (req, res) => controller.create(req, res));
addressRouter.get('/', (req, res) => controller.list(req, res));
addressRouter.get('/:id', (req, res) => controller.findById(req, res));
addressRouter.put('/:id', (req, res) => controller.update(req, res));
addressRouter.delete('/:id', (req, res) => controller.delete(req, res));

export { addressRouter };
