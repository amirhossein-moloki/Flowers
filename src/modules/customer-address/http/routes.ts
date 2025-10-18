import { Router } from 'express';
import { CustomerAddressController } from './controller';

const customerAddressRouter = Router();
const customerAddressController = new CustomerAddressController();

customerAddressRouter.post('/', (req, res) => customerAddressController.create(req, res));
customerAddressRouter.get('/', (req, res) => customerAddressController.list(req, res));
customerAddressRouter.get('/:id', (req, res) => customerAddressController.findById(req, res));
customerAddressRouter.put('/:id', (req, res) => customerAddressController.update(req, res));
customerAddressRouter.delete('/:id', (req, res) => customerAddressController.delete(req, res));

export { customerAddressRouter };