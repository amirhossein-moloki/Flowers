import { Router } from 'express';
import { CustomerAddressController } from './controller';
import { CustomerAddressDependencies } from '../customer-address.dependencies';
import { isAuthenticated } from '@/core/middlewares/auth.middleware';

export const createCustomerAddressRoutes = (dependencies: CustomerAddressDependencies): Router => {
  const router = Router();
  const customerAddressController = new CustomerAddressController(dependencies);

  router.use(isAuthenticated);

  router.post('/', (req, res) => customerAddressController.create(req, res));
  router.get('/', (req, res) => customerAddressController.list(req, res));
  router.get('/:id', (req, res) => customerAddressController.findById(req, res));
  router.put('/:id', (req, res) => customerAddressController.update(req, res));
  router.delete('/:id', (req, res) => customerAddressController.delete(req, res));

  return router;
};